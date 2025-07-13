const User = require("../../models/User");
const bcrypt = require("bcrypt");

exports.updatePassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    // 1. Validate input
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // 2. Find user by token and check expiry
    const user = await User.findOne({
      token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // 3. Hash and update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.token = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // 4. Response
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("Error in updatePassword:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};
