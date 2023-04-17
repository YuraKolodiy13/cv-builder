const cvController = require("../controllers/CV");
const {Router} = require("express");
const router = Router();

// Create a new cv
router.post('/', cvController.createCV);
router.get('/', cvController.getCVs);
router.get('/:id', cvController.getCV);


module.exports = router;