const User = require("../../models/User");
const Accommodation = require("../../models/Accommodation");

exports.getAllLikedAccommodationId = async (req, res) => {
  try {
    const userId = req.userId;

    // 1. Find user and populate favorites
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      accommodations: user.favorites,
    });

  } catch (error) {
    console.error("Error in getAllLikedAccommodation:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch liked accommodations",
    });
  }
};
