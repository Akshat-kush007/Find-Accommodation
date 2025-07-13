const User = require("../../models/User");

exports.unlikeAccommodation = async (req, res) => {
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

    // 2. Remove from user's favorites
    await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: accommodationId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Accommodation removed from favorites",
    });
  } catch (error) {
    console.error("Error in unlikeAccommodation:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to unlike accommodation",
    });
  }
};
