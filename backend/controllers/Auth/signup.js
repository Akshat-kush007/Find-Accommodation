const bcrypt = require("bcrypt");
const User = require("../../models/User");
const OTP = require("../../models/OTP");

exports.signup = async (req, res) => {
  try {
    const { name, email, otp, password, confirmPassword } = req.body;

    // 1. Validate inputs
    if (!name || !email || !otp || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 3. Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // 4. Find most recent OTP for email
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    
    if (recentOtp.length === 0 || recentOtp[0].otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType: "user",
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};
