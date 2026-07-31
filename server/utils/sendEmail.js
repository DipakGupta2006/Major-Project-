const axios = require("axios");

const sendOtpEmail = async (toEmail, otp) => {
    await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
            // sender: { name: "VaultX", email: "APNA_VERIFIED_SENDER_EMAIL_YAHA" },
            sender: { name: "VaultX", email: "dipakunofficial1999@gmail.com" },
            to: [{ email: toEmail }],
            subject: "Your VaultX verification code",
            htmlContent: `<p>Your OTP is: <strong>${otp}</strong></p><p>This code expires in 10 minutes.</p>`,
        },
        {
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }
    );
};

module.exports = { sendOtpEmail };