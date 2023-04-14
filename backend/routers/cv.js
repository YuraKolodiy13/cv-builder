const cvController = require("../controllers/CV");
const {Router} = require("express");
const router = Router();

// Create a new cv
router.post('/', cvController.createCV);
router.get('/', cvController.getCVs);


module.exports = router;