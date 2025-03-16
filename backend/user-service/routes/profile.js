const express = require("express");
const isAuth = require("../middlewares/isAuth");
const {
  completeRegistration,
  updateInfo,
  updateAbout,
  getUserDataById,
  addEducation,
  updateEducation,
  deleteEducation,
  addExperience,
  updateExperience,
  deleteExperience,
  addSkill,
  deleteSkill,
  updateInterests,
} = require("../controllers/profile");
const router = express.Router();
const upload = require("../upload");

router.get("/getUserDataById/:id", isAuth, getUserDataById);
router.put("/completeRegistration", isAuth, completeRegistration);
router.put("/updateInfo", isAuth, upload.single("profile_picture"), updateInfo);
router.put("/updateAbout", isAuth, updateAbout);

router.post("/addEducation", isAuth, addEducation);
router.put("/updateEducation/:educationId", isAuth, updateEducation);
router.delete("/deleteEducation/:educationId", isAuth, deleteEducation);

router.post("/addExperience", isAuth, addExperience);
router.put("/updateExperience/:experienceId", isAuth, updateExperience);
router.delete("/deleteExperience/:experienceId", isAuth, deleteExperience);

router.post("/addSkill", isAuth, addSkill);
router.delete("/deleteSkill/:index", isAuth, deleteSkill);

router.post("/updateInterests", isAuth, updateInterests);

module.exports = router;
