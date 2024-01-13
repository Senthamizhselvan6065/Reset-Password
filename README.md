# Password Reset...

------------------------------

## MERN Stack

<div align="center">
	<table>
		<tr>
			<td><code><img width="50" src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" alt="JavaScript" title="JavaScript"/></code></td>
			<td><code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code></td>
			<td><code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code></td>
			<td><code><img width="50" src="https://github.com/marwin1991/profile-technology-icons/assets/62091613/b40892ef-efb8-4b0e-a6b5-d1cfc2f3fc35" alt="Vite" title="Vite"/></code></td>
			<td><code><img width="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code></td>
		</tr>
	</table>
</div>

-------------------------------

## Dependencies and using npm packages
  
1. bcrypt
2. body-parse
3. cors
4. express 
5. mongoose
6. dotenv
7. jsonwebtoken
8. nodemailer
9. nodemon
10. validator
11. crypto
12. express-async-handler

-------------------------------

## BackEnd Router End Points

### BASE_URL : https://password-reset-api-c3sy.onrender.com

<b>Create a new Account</b>
<pre>POST : <a href='https://password-reset-api-c3sy.onrender.com/api/v1/register'>/register</a></pre>

<b>Login a user</b>
<pre>POST : <a href='https://password-reset-api-c3sy.onrender.com/api/v1/login'>/login</a></pre>

<b>Forgot Password</b>
  > your reset password link send register email address 
<pre>POST : <a href='https://password-reset-api-c3sy.onrender.com/api/v1/forgot/password'>/forgot/password</a></pre>

<b>Reset Password</b>
  > get the link and reset your new password
<pre>POST : <a href='https://password-reset-api-c3sy.onrender.com/api/v1/reset/password/:token'>/reset/password</a></pre>

---------------------------------

## FrontEnd Router End Points

### BASE_URL : https://password-resset-api.netlify.app

<b>Create a user</b>
<pre>POST : <a href='https://password-resset-api.netlify.app/register'>/register</a></pre>

<b>Login a user</b>
<pre>POST : <a href='https://password-resset-api.netlify.app/login'>/login</a></pre>

<b>Forgot Password</b>
<pre>POST : <a href='https://password-resset-api.netlify.app/forgot/password'>/forgot/password</a></pre>

<b>Reset Password</b>
<pre>POST : <a href='https://password-resset-api.netlify.app/reset/password/:token'>/reset/password/:token</a></pre>
