const Accommodation = require("../../models/Accommodation");
const User = require("../../models/User");

exports.deleteAccommodation = async (req, res) => {
  try {
    const { accommodationId } = req.body;

    if (!accommodationId) {
      return res.status(400).json({
        success: false,
        message: "Accommodation ID is required",
      });
    }

    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: "Accommodation not found",
      });
    }

    // Ensure only the user who added it can delete it
    if (accommodation.addedBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this accommodation",
      });
    }

    // Remove accommodation from any user's favorites
    await User.updateMany(
      { favorites: accommodationId },
      { $pull: { favorites: accommodationId } }
    );

    await Accommodation.findByIdAndDelete(accommodationId);

    res.status(200).json({
      success: true,
      message: "Accommodation deleted successfully",
    });

  } catch (error) {
    console.error("Error in deleteAccommodation:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete accommodation",
    });
  }
};
