const router = require("express").Router();

// Public Route
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Seja bem vindo!" });
});

module.exports = router;
