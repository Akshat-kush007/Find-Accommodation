const User = require("../../models/User");
const Accommodation = require("../../models/Accommodation");

exports.likeAccommodation = async (req, res) => {
  try {
    const userId = req.userId;
    const { accommodationId } = req.body;

    // 1. Validate input
    if (!accommodationId) {
      return res.status(400).json({
        success: false,
        message: "Accommodation ID is required",
      });
    }

    // 2. Check if accommodation exists
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: "Accommodation not found",
      });
    }

    // 3. Update user's favorites
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: accommodationId } }, // avoids duplicates
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Accommodation added to favorites",
    });
    
  } catch (error) {
    console.error("Error in likeAccommodation:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to like accommodation",
    });
  }
};
