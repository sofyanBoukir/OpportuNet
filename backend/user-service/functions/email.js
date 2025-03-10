const generateEmailHTML_FORVCODE = (userName, appName, verificationCode) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to ${appName}</title>
          <style>
            body{
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              margin: 0;
              padding: 0;
            }
            .container{
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1{
              color:rgb(0, 10, 154);
            }
            p{
              font-size: 16px;
              line-height: 1.6;
              color: #333333;
            }
            .code {
              font-size: 26px;
              font-weight: bold;
              color: rgb(27, 40, 215);
            }

            .appName{
                color : rgb(27, 40, 215);
                
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to ${appName}, ${userName}!</h1>
            <p>Thank you for signing up with ${appName}! We're excited to have you on board.</p>
            <p>To get started, please verify your email address by entering the following verification code:</p>
            <p class="code">${verificationCode}</p>
            <p>If you didn't sign up for this account, please ignore this email.</p>
            <p>If you have any questions or need assistance, feel free to contact us at this email</p>
            <p>Best regards,<br>The <span class="appName">${appName}</span> dev Team</p>
          </div>
        </body>
      </html>
    `;
};


const generateEmailHTML_FORRLINK = (token,appName,email,link) => {
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset Request</title>
            <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 800px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: rgb(0, 10, 154);
            }
            p {
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: rgb(200, 202, 235);
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 20px;
            }
            .footer {
                font-size: 14px;
                color: #999999;
                text-align: center;
                margin-top: 30px;
            }
            .appName{
                color : rgb(27, 40, 215);    
            }
            </style>
        </head>
        <body>
            <div class="container">
            <h1>Password Reset Request</h1>
            <p>Hi,</p>
            <p>We received a request to reset the password for your account. If you made this request, please click the button below to reset your password.</p>
            <p>
                <a href="${link}/${token}?email=${email}" class="button">Reset Your Password</a>
            </p>
            <p>If you didn't request a password reset, please ignore this email. Your password will not be changed.</p>
            <p>This link is will be expired after 5 minutes.</p>
            <p>Best regards,<br>The <span class="appName">${appName}</span> dev Team</p>
            </div>
        </body>
        </html>
    `;
};


module.exports = {generateEmailHTML_FORVCODE, generateEmailHTML_FORRLINK}