import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const sendEmail = async (to, subject, text) => {
  try {
    // Create OAuth2 client
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    // Set credentials
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    // Create Gmail API instance
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // Create email content in RFC 2822 format
    const emailLines = [
      `From: ${process.env.EMAIL_FROM}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "",
      text,
    ];

    const email = emailLines.join("\r\n");

    // Encode email in base64url format
    const encodedEmail = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // Send email using Gmail API
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.log("Email error:", error.message);
    throw error;
  }
};

export default sendEmail;
