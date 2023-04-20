const cvController = require("../controllers/CV");
const {Router} = require("express");
const router = Router();

router.post('/', cvController.createCV);
router.get('/', cvController.getCVs);
router.get('/:id', cvController.getCV);
router.put('/:id', cvController.updateCV);
router.delete('/:id', cvController.deleteCV);


module.exports = router;