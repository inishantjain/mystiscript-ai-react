export const setPasswordTemplate = (name: string, link: string) => {
  const subject = "Set Your Password - MystiScript";

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
      background-color: #ff4444; /* Red background color for the header */
      color: #fff;
      text-align: center;
      padding: 10px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .content {
      padding: 20px;
    }
    .button {
      display: inline-block;
      background-color: #ff4444; /* Red background color for the button */
      color: #fff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      transition: background-color 0.2s;
    }
    .button:hover {
      background-color: #cc0000; /* Darker red color on button hover */
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Update Confirmation</h1>
    </div>
    <div class="content">
      <p>Hello ${name},</p>
      <p>To update your password, please click the button below:</p>
      <a href="${link}" class="button">Update Password</a>
      <p>Thank you for using MystiScript!</p>
    </div>
  </div>
</body>
</html>
`;

  return { subject, html };
};
