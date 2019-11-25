const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");


router.get("/",userController.getIndex);
router.post("/yeni-urun",userController.addNewProduct);
router.post("/sil",userController.urunuSil)


// router.post("/profile/",userController.getProfile);
// router.get("/profile/:profile",userController.showProfile);

module.exports = router;