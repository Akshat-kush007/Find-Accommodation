  const OTP = require("../../models/OTP");
  const otpGenerator = require("otp-generator");
  const User = require("../../models/User");

  exports.sendOTP = async (req, res) => {
    try {
      const { email } = req.body;

      // 1. Validate email
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
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
          message: "User already exists with this email",
        });
      }

      // 3. Generate a 6-digit numeric OTP
      const otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      // 4. Save OTP to DB (email + otp)
      await OTP.create({ email, otp });

      // 5. Respond
      res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      });

    } catch (error) {
      console.error("Error in sendOTP:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to send OTP",
      });
    }
  };
