const User = require("../../models/User");
const crypto = require("crypto");
const mailSender = require("../../utils/mailSender");

exports.updatePasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found with this email",
      });
    }

    // 3. Generate token and expiry
    const token = crypto.randomBytes(32).toString("hex");
    const expireTime = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.token = token;
    user.resetPasswordExpire = expireTime;
    await user.save();

    // 4. Send email with token link
    const resetLink = `${process.env.CLIENT_URL}/update-password/${token}`;
    const mailBody = `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 10 minutes.</p>
    `;

    await mailSender(user.email, "Reset Password Link", mailBody);

    // 5. Respond success
    res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
    });

  } catch (error) {
    console.error("Error in updatePasswordToken:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send reset password email",
    });
  }
};
