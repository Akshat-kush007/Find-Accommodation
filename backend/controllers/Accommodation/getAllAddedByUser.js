const Accommodation = require("../../models/Accommodation");

exports.getAllAddedByUser = async (req, res) => {
  try {
    const userId = req.userId;

    const accommodations = await Accommodation.find({ addedBy: userId });

    res.status(200).json({
      success: true,
      accommodations,
    });

  } catch (error) {
    console.error("Error in getAllAddedByUser:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch accommodations added by user",
    });
  }
};
