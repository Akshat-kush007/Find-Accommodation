const Accommodation = require("../../models/Accommodation");

exports.getAllAccommodation = async (req, res) => {
  try {
    const accommodations = await Accommodation.find()
      .populate("addedBy", "name email") // Optional: include creator info
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      accommodations,
    });
    
  } catch (error) {
    console.error("Error in getAllAccommodation:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch accommodations",
    });
  }
};
