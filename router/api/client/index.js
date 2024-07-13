const router = require("express").Router();
const auth = require("./auth");
const merchant = require("./merchant");

router.use("/auth", auth);
router.use("/merchant", merchant);

module.exports = router;
