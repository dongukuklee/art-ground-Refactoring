const { Router } = require("express");
const { sign } = require("./sign");
const router = Router();
const { getToken, getUserInfo } = require("./sign/google");
const { generalSignUp, authorSignUp } = require("./sign/signUp");
const { signIn } = require("./sign/signIn");
const { signOut } = require("./sign/signOut");

router.post("/receive/token", getToken);
router.get("/receive/userinfo?", getUserInfo);
router.post("/sign-up/user", generalSignUp);
router.post("/sign-up/author", authorSignUp);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);

module.exports = router;
