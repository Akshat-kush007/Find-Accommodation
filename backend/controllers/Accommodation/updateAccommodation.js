const Accommodation = require("../../models/Accommodation");

exports.updateAccommodation = async (req, res) => {
  try {
    const { accommodationId, name, map, phone, city, location, address } = req.body;

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

    if (accommodation.addedBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this accommodation",
      });
    }

    // Update fields if provided
    if (name) accommodation.name = name;
    if (map) accommodation.map = map;
    if (phone) accommodation.phone = phone;
    if (city) accommodation.city = city;
    if (location) accommodation.location = location;
    if (address) accommodation.address = address;

    await accommodation.save();

    res.status(200).json({
      success: true,
      message: "Accommodation updated successfully",
      accommodation,
    });

  } catch (error) {
    console.error("Error in updateAccommodation:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update accommodation",
    });
  }
};
