const router = require("express").Router();
import { register, login, logout } from "../controller/auth.controller";
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
