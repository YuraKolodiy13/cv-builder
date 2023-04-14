const cvController = require("../controllers/CV");
const {Router} = require("express");
const router = Router();

// Create a new cv
router.post('/', cvController.createCV);


module.exports = router;