const Accommodation = require("../../models/Accommodation");

exports.addAccommodation = async (req, res) => {
  try {
    const { name, map, phone, city, location, address } = req.body;
    const userId = req.userId;

    // 1. Validate input
    if (!name || !phone || !city || !location || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }


    // 2. Build the accommodation object
    const accommodationData = {
      name,
      phone,
      city,
      location,
      address,
      addedBy: userId,
    };

    // If map is provided, include it
    if (map) {
      accommodationData.map = map;
    }

    // Create accommodation
    const newAccommodation = await Accommodation.create(accommodationData);

    // 3. Response
    res.status(201).json({
      success: true,
      message: "Accommodation added successfully",
      accommodation: newAccommodation,
    });
    
  } catch (error) {
    console.error("Error in addAccommodation:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add accommodation",
    });
  }
};
