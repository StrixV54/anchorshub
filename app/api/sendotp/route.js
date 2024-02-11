import nodemailer from "nodemailer";

export async function POST(request) {
  const MAIL_SETTINGS = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  };

  try {
    const { name, email } = await request.json();
    const transporter = nodemailer.createTransport(MAIL_SETTINGS);

    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: email,
      subject: "Hello " + name,
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
      </div>
    `,
    });
    return Response.json({
      message: "Successfully send the otp.",
      information: info,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Something went wrong : ${error?.message}`, {
      status: 500,
    });
  }
}
