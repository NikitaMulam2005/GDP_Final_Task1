const express= require('express');
const router =express.Router();
const foodController= require('../controllers/foodController');
const { recompileSchema } = require('../models/foodCategory');

router.get('/',foodController.homepage);
module.exports = router;


router.get('/Categories',foodController.exploreCategories);
module.exports=router;

router.get('/recipe/:id',foodController.exploreRecipe);
router.get('/explore', foodController.explore);
router.get('/submit',foodController.submit);
router.post('/submit', foodController.submitOnPost);
router.get('/about', foodController.aboutpage);
