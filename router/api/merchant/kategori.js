const router = require("express").Router();
const {
  createKategori,
  getAllKategori,
  getDetailKategori,
  deleteKategori,
  updateKategori,
} = require("../../../controllers/merchant/kategori");
const { authToken } = require("../../../middleware/merchant");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/category");
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
}).fields([{ name: "image" }]);

router.post("/", authToken, uploadPhoto, createKategori);
router.put("/:categoryId", uploadPhoto, updateKategori);
router.get("/", authToken, getAllKategori);
router.get("/:categoryId", getDetailKategori);
router.delete("/:categoryId", deleteKategori);

module.exports = router;
