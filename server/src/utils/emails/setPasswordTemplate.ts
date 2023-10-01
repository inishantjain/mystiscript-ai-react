export const setPasswordTemplate = (email: string, name: string, link: string) => {
  const subject = "Set Your Password - MystiScript";

  const html = `
    <html>
    <head>
      <style>
        /* Add your CSS styles here */
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #007bff;
          color: #fff;
          text-align: center;
          padding: 10px;
        }
        .content {
          padding: 20px;
        }
        .button {
          display: inline-block;
          background-color: #007bff;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
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
