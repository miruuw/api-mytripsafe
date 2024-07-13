const router = require("express").Router();
const {
  createProduk,
  getAllProduk,
  getDetailProduk,
  updateProduk,
  deleteProduk,
} = require("../../../controllers/merchant/produk");
const { authToken } = require("../../../middleware/merchant");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/produk");
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
}).fields([{ name: "photo" }]);

router.post("/", authToken, uploadPhoto, createProduk);
router.put("/:produkId", uploadPhoto, updateProduk);
router.get("/", authToken, getAllProduk);
router.get("/:produkId", getDetailProduk);
router.delete("/:produkId", deleteProduk);

module.exports = router;
