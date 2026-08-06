const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");


const {
    home,
    addPassword,
    viewPassword,
    updatePassword,
    deletePassword,
    recycleBinPassword,
    getRecycleBinPassword,
    getCategoriesPassword,
    getFavoritePassword,
    generatePassword,
    analyzePasswords,
    getProfile,
    updateProfile,
} = require("../controllers/vaultController");

router.get("/home", verifyToken, home);
router.post("/add-password", verifyToken, addPassword);
router.get("/view-password", verifyToken, viewPassword);
router.put("/update-password/:id", verifyToken, updatePassword);
router.delete("/delete-password/:id", verifyToken, deletePassword);
router.put("/recycle-bin/:id", verifyToken, recycleBinPassword);
router.get("/recycle-bin-passwords", verifyToken, getRecycleBinPassword);
router.get("/categories", verifyToken, getCategoriesPassword);
router.get("/favorite-passwords", verifyToken, getFavoritePassword);
router.get("/generate-password", verifyToken, generatePassword);
router.get("/analyze-passwords", verifyToken, analyzePasswords);
router.get("/profile", verifyToken, getProfile);
router.put("/update-profile", verifyToken, updateProfile);


module.exports = router;