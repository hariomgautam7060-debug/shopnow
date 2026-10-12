const express = require("express");
const {protect} = require("../middleware/authmiddleware");
const{admin}= require("../middleware/adminmiddleware");
const router = express.Router(); 
const { getadminstates } = require("../controllers/analyticscontroller");

router.get("/",protect,admin,getadminstates);

module.exports = router;

