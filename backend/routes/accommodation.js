const express = require("express");
const router = express.Router();

const {addAccommodation} = require("../controllers/Accommodation/addAccommodation");
const {likeAccommodation} = require("../controllers/Accommodation/likeAccommodation");
const {unlikeAccommodation} = require("../controllers/Accommodation/unlikeAccommodation");
const {getAllAccommodation} = require("../controllers/Accommodation/getAllAccommodation");
const {getAllLikedAccommodation} = require("../controllers/Accommodation/getAllLikedAccommodation");
const {getAllLikedAccommodationId} = require("../controllers/Accommodation/getAllLikedAccommodationId");
const {getAllAddedByUser} = require("../controllers/Accommodation/getAllAddedByUser");
const {updateAccommodation} = require("../controllers/Accommodation/updateAccommodation");
const {deleteAccommodation} = require("../controllers/Accommodation/deleteAccommodation");

const {auth} = require("../middleware/auth");

// All routes below are protected
router.use(auth);

router.post("/addAccommodation", addAccommodation);
router.post("/likeAccommodation", likeAccommodation);
router.post("/unlikeAccommodation", unlikeAccommodation);
router.get("/getAllAccommodation", getAllAccommodation);
router.get("/getAllLikedAccommodation", getAllLikedAccommodation);
router.get("/getAllLikedAccommodationId", getAllLikedAccommodationId);
router.get("/getAllAddedByUser", getAllAddedByUser);
router.put("/updateAccommodation", updateAccommodation);
router.delete("/deleteAccommodation", deleteAccommodation);

module.exports = router;
