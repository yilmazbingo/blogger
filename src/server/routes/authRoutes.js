const router = require("express").Router();
require("../mongoose");
const passport = require("passport");
const authCtrl = require("../controllers/authCtrl");

router.get("/google", authCtrl.getGoogle);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  authCtrl.getCallback
);

router.get("/logout", authCtrl.logout);

router.get("/current_user", authCtrl.currentUser);

module.exports = router;
