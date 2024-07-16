const { TEMPLATE_NAME } = require('../../constants')

module.exports = {
	[TEMPLATE_NAME.HTML_EMAIL_SEND_TOKEN]: `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #ddd;
            }
            .email-header h1 {
                margin: 0;
                color: #333;
            }
            .email-body {
                padding: 20px;
            }
            .email-body p {
                color: #555;
                line-height: 1.6;
            }
            .verify-button {
                display: block;
                width: 200px;
                margin: 20px auto;
                padding: 10px 20px;
                text-align: center;
                background-color: #007bff;
                color: #fff !important;
                text-decoration: none;
                border-radius: 4px;
            }
            .verify-button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Verification Your Account</h1>
            </div>
            <div class="email-body">
                <p>Thank you for registering with us. Please click the button below to verify your email address and complete the registration process.</p>
                <a href="{{link_verify}}" class="verify-button">Verification Account</a>
                <p>If you did not create an account, no further action is required.</p>
                <p>Best regards,</p>
                <p>&copy; 2024. All rights reserved.</p>
                <p>Contact with us: <a href="mailto:huynhnhathao0609@gmail.com">huynhnhathao0609@gmail.com</a></p>
            </div>
        </div>
    </body>
    </html>`,

	[TEMPLATE_NAME.HTML_EMAIL_SEND_TEMPORARY_PASSWORD]: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }
        .email-header h1 {
            margin: 0;
            color: #333;
        }
        .email-body {
            padding: 20px;
        }
        .email-body p {
            color: #555;
            line-height: 1.6;
        }
        .temporary-password {
            display: block;
            width: fit-content;
            margin: 20px auto;
            padding: 10px 20px;
            text-align: center;
            background-color: #007bff;
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            text-decoration: none;
            border-radius: 4px;
        }
        .temporary-password:hover {
            background-color: #0056b3;
        }
    </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>Welcome to E-Commerce!</h1>
            </div>
            <div class="email-body">
                <p>Thank you for registering with us! We are excited to have you on board.</p>
                <p>Please, update password because account just exist in 24 hours.</p>
                <p>Temporary password is:</p>
                <span class="temporary-password">{{temporary_password}}</span>
                <p>If you did not create an account, please ignore this email or contact our support team.</p>
                <p>Best regards,</p>
            </div>
        </div>
    </body>
    </html>`,
}
