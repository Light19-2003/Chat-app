export const WelcomeEmailTemplate = (name, appLink) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="padding: 40px 0;"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background: #ffffff;
              border-radius: 10px;
              padding: 40px;
            "
          >
            <tr>
              <td align="center">
                <h1 style="color: #333333;">
                  Welcome ${name} 👋
                </h1>

                <p
                  style="
                    color: #666666;
                    font-size: 16px;
                    line-height: 24px;
                  "
                >
                  Thank you for joining our app.
                  We are excited to have you onboard.
                </p>

                <a
                  href="${appLink}"
                  style="
                    display: inline-block;
                    margin-top: 20px;
                    padding: 14px 28px;
                    background-color: #000000;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 6px;
                    font-size: 16px;
                  "
                >
                  Open App
                </a>

                <p
                  style="
                    margin-top: 40px;
                    color: #999999;
                    font-size: 14px;
                  "
                >
                  If you did not create this account,
                  you can safely ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};