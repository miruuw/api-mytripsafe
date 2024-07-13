const router = require("express").Router();
const auth = require("./auth");
const kategori = require("./kategori");
const produk = require("./produk");

router.use("/auth", auth);
router.use("/kategori", kategori);
router.use("/produk", produk);

module.exports = router;
