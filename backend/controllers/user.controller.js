const userRouter = require('express').Router();
const asyncErrorHandler = require('express-async-handler');
const ErrorHandler = require('../middlewares/ErrorHandler');
const User = require('../models/user.model');
const { hashPassword, comparePassword, createJwtToken, resetUrlStringToken } = require('../helper/user.validate');
const sendEmail = require('../helper/email');
const crypto = require('crypto');


userRouter.get('/getusers', asyncErrorHandler( async (req, res, next) => {
    const getAllusers = await User.find();
    if(getAllusers){
        return res.status(200).json({
            success: true,
            message: 'fetch all users data...',
            count: getAllusers.length,
            user: getAllusers
        })
    }else if(!getAllusers) return next (new ErrorHandler(400, 'cannot get users data...'))
}))

/* post methos */
/* urlPath - /api/v1/register */
userRouter.post('/register', asyncErrorHandler( async (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name && !email && !password){
        return next (new ErrorHandler(404, 'please enter name & email & password...'));
    }
    else if(!name) return next (new ErrorHandler(404, 'please enter name...'));
    else if(!email) return next (new ErrorHandler(404, 'please enter email...'));
    else if(!password) return next (new ErrorHandler(404, 'please enter password...'));
    /* find user email in database */
    const user = await User.findOne({email});
    if(user) return next (new ErrorHandler(400, 'Already used this email address...'));
    /* hash password function */
    const hash = await hashPassword(password)
    /* create a new user */
    const newUser = await User({
        name,
        email,
        password: hash
    }); 
    await newUser.save();
    if(!newUser){
       return next (new ErrorHandler(404, 'cannot created user data...'))
    }else if(newUser){
        return res.status(200).json({
            success: true,
            message: 'user data created success...',
            user: newUser
        });
    }
}));

/* post methos */
/* urlPath - /api/v1/login */
userRouter.post('/login', asyncErrorHandler( async (req, res, next) => {
    const {email, password} = req.body;
    if(!email && !password){
        return next (new ErrorHandler(404, 'please enter email & password...'));
    }
    else if(!email) return next (new ErrorHandler(404, 'please enter email...'));
    else if(!password) return next (new ErrorHandler(404, 'please enter password...'));
    /* find user email in database */
    const user = await User.findOne({email});
    if(user){
        /* user password compare function */
        let comparePwd = await comparePassword(password, user.password);
        if(comparePwd){
            /* create jwt token */
            const token = await createJwtToken(user);
            if(token){
                res.status(200).json({
                    success: true,
                    message: `user ${user.name} login success...`,
                    user,
                    token
                })
            }else if(!token) return next (new ErrorHandler(400, 'Invalid token...'))
        }else if(!comparePwd) return next (new ErrorHandler(400, 'please enter proper password...'))
    }else if(!user) return next (new ErrorHandler(400, 'please enter proper email address...'));
}));

/* post methos */
/* urlPath - /api/v1/forgot/password */
userRouter.post('/forgot/password', asyncErrorHandler( async (req, res, next) => {
    const {email} = req.body;
    if(!email) return next (new ErrorHandler(404, 'please enter email...'));
    /* find user email in database */
    const user = await User.findOne({email});
    if(!user) return next (new ErrorHandler(400, 'please enter proper email address...'));
    /* reset password function */
    const resetToken = await resetUrlStringToken(user);
    await user.save()
    let BASE_URL = process.env.FRONTEND_URL;
    /* create reset url */ 
    const resetUrl = `<a href=${BASE_URL}/reset/password/${resetToken}> Rest your password </a>`;
     /* email send nessage */
    const message = `Your password reset url is as follows\n\n ${resetUrl}\n\n if you have not requested this email, then ignore it`;
    /* send email */
    try {
        sendEmail({
            email: user.email,
            subject: "Password reset request...",
            message
        }) 
        res.status(200).json({
            success: true,
            message: `send the link ${user.email}`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false})
        return next(new ErrorHandler(500, error.message))
    }
}));

/* post methos */
/* urlPath - /api/v1/reset/password/:token */
userRouter.post('/reset/password/:token', asyncErrorHandler( async (req, res, next) => {
    const {token} = req.params;
    const {password, confirmPassword} = req.body;
    if(!password && !confirmPassword) return next (new ErrorHandler(400, 'please enter new password & confirm password...'))
    if(!password) return next (new ErrorHandler(400, 'please enter new password...'));
    else if(!confirmPassword) return next (new ErrorHandler(400, 'please enter confirm password...'));
    /* hash token */
     const hashToken = await crypto.createHash('sha256').update(token).digest('hex');
    /* find the user data in database and get reset password token and expire time */
    const user = await User.findOne({
        resetPasswordToken: hashToken,
        resetPasswordTokenExpire: {
            $gt: Date.now()
        }
    })  
    if(!user) return next(new ErrorHandler(401, "reset token is invalid or expired..."));
    /* match password */
    if(password !== confirmPassword) return next (new ErrorHandler(400, 'password cannot match...?'));
    /* reset password hashing */
    let hashedPassword = await hashPassword(password);
    user.password = hashedPassword 
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpire = undefined
    await user.save();
    res.status(200).json({
        success: true,
        message: "your new password updated..."
    })
}));

module.exports = userRouter;