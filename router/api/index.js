const router = require("express").Router();
const client = require("./client");
const merchant = require("./merchant");

router.use("/client", client);
router.use("/merchant", merchant);

module.exports = router;
