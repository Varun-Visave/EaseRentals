const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const otpGenerator = require("otp-generator");

dotenv.config();

// Configure the transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Set to true if using port 465
  auth: {
    user: process.env.MAIL_SERVICE_ADDRESS,
    pass: process.env.MAIL_SERVICE_PASS,
  },
});

let generatedOtp = null

// Function to send OTP via email
async function sendOtpEmail(toEmail, otp) {
  const info = await transporter.sendMail({
    from: '"AutoMail" <AutoMail.02.11.04@gmail.com>',
    to: toEmail,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
    html: `
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .otp-header {
            font-size: 24px;
            color: #007BFF;
            margin-bottom: 20px;
          }
          .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #333;
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0;
          }
          .message {
            font-size: 16px;
            margin: 10px 0;
            color: #666;
          }
          .footer {
            font-size: 14px;
            color: #999;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="otp-header">Your OTP Verification Code</div>
          <div class="otp-code">${otp}</div>
          <div class="message">Please enter the code above in the application to proceed. This code is valid for 10 minutes.</div>
          <div class="footer">
            If you did not request this, please ignore this email.<br/>
            <strong>AutoMail</strong> - My Custom Mail Service.
          </div>
        </div>
      </body>
      </html>
    `,
  });

  console.log("Message sent: %s", info.messageId);
}

// Generate OTP and send it via email
// async function generateAndSendOtp(req, res) {
async function generateAndSendOtp(email) {
  // console.log("this is from the nodeMailer file "+email)
  // return;
  
  // const { email } = req.body;

  if (!email) {
    console.log("email not found and wont send otp")
    return
    // return res.status(400).json({ error: "Email is required." });
  }

  // // Generate a 6-digit OTP (you can adjust the length if needed)
  const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
  generatedOtp = otp;
  // // Call the function to send OTP via email
  try {
    await sendOtpEmail(email, otp);
    // res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    // res.status(500).json({ error: "Failed to send OTP" });
  }
}

// OTP Verification function
// OTP Verification function
async function verifyOtp(userOtp, res) {
  if (userOtp === generatedOtp) {
    console.log("OTP is valid");
    return res.status(200).json({ message: "OTP verified successfully!" });
  } else {
    console.log("OTP is invalid");
    return res.status(400).json({ message: "Invalid OTP!" });
  }
}


module.exports = { generateAndSendOtp, verifyOtp };
