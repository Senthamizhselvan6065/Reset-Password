const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


/* hash password function */
let saltRound = 10;
const hashPassword = async password => await bcrypt.hash(password, saltRound);

/* compare password function */
const comparePassword = async (password, userPassword) => await bcrypt.compare(password, userPassword);

/* jwt token create function */
const createJwtToken = async user => await jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_TIME});

/* reset password string create function */
const resetUrlStringToken = async (user) => {
     /* create reset password string */
     const token = crypto.randomBytes(20).toString('hex');
     /* create a hash string and set to resetPasswordToken */
     user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
     /* set reset string exipre time */
     user.resetPasswordTokenExpire = Date.now() + 30 * 60 * 60 * 1000;
     return token;
}


module.exports = {hashPassword, comparePassword, createJwtToken, resetUrlStringToken}