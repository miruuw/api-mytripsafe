const router = require("express").Router();
const {
  getAllMerchant,
  getAllCategoryMerchant,
  getAllProductMerchant,
} = require("../../../controllers/client/merchant");

router.get("/", getAllMerchant);
router.get("/category/:merchantId", getAllCategoryMerchant);
router.post("/produk", getAllProductMerchant);

module.exports = router;
