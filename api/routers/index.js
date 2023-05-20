const Router = require('express');
const router = new Router();
const authRouter = require('./auth');
const cvRouter = require('./cv');
const commonRouter = require('./common');
const authMiddleware = require('../middlewares/Auth');

router.use("/auth", authRouter);
router.use("/cv", authMiddleware, cvRouter);
router.use("/common", commonRouter);

module.exports = router;