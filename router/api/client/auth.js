const router = require("express").Router();
const {
  signUp,
  signIn,
  getClient,
  updatePosition,
} = require("../../../controllers/client/auth");
const { authToken } = require("../../../middleware/client");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.put("/position", authToken, updatePosition);
router.get("/", authToken, getClient);

module.exports = router;
