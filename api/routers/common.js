const commonController = require("../controllers/Common");
const {Router} = require("express");
const router = Router();

router.get('/fonts', commonController.getFonts);
router.get('/fonts/:name', commonController.getFont);

module.exports = router;