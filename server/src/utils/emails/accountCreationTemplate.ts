export const accountCreationTemplate = (name: string, temporaryPassword: string, link: string) => {
  const subject = `Your account has been created - MystiScript`;
  const html = `
<html>
<head>
  <style>
    /* Add your CSS styles here */
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0; /* Background color for the entire email */
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff; /* Background color for the email content */
      border: 1px solid #e0e0e0; /* Border for the email content */
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Box shadow for the email content */
    }
    .header {
      background-color: #4caf50; /* Green background color for the header */
      color: #fff;
      text-align: center;
      padding: 10px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .content {
      padding: 20px;
    }
    .password-info {
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      background-color: #4caf50; /* Green background color for the button */
      color: #fff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #45a049; /* Darker green color on button hover */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to MystiScript!</h1>
    </div>
    <div class="content">
      <p>Hello ${name},</p>
      <p>Your account has been created successfully.</p>
      <div class="password-info">
        <p><strong>Temporary Password:</strong> ${temporaryPassword}</p>
        <p>Please click the button below to set your password and access your account:</p>
        <a href="${link}" class="button">Set Password</a>
      </div>
      <p>If you didn't create this account or need further assistance, please contact our support team.</p>
      <p>Thank you for choosing MystiScript!</p>
    </div>
  </div>
</body>
</html>
  `;

  return { subject, html };
};
