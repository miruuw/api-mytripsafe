const router = require("express").Router();
const {
  signUp,
  signIn,
  getMerchant,
  updateProfile,
} = require("../../../controllers/merchant/auth");
const { authToken } = require("../../../middleware/merchant");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "merchantPhoto") {
      cb(null, "./assets/merchant");
    } else {
      cb(null, "./assets/owner-merchant");
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadPhoto = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
}).fields([{ name: "merchantPhoto" }, { name: "ownerPhoto" }]);

router.post("/signup", uploadPhoto, signUp);
router.post("/signin", signIn);
router.get("/", authToken, getMerchant);
router.put("/profile/:merchantId", uploadPhoto, updateProfile);

module.exports = router;
