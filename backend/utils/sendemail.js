const nodemailer = require("nodemailer");

// ✅ Email send karne ka function
const sendEmail = async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: html
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${email}`);
        return true;

    } catch (error) {
        console.log("❌ Email Error:", error);
        return false;
    }
};

// ✅ OTP generate karne ka function
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = { sendEmail, generateOTP };