const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
   name: {
      type: String,
      required: 'This field is required.'
   },
   description: {
      type: String,
      required: 'This field is required.'
   },
   email: {
      type: Array,
      required: 'This field is required.'
   },
   ingredients: {
      type: Array,
      required: 'This field is required.'
   },
   category: {
      type: String, 
      enum: ['Breakfast', 'NonVeg', 'Desserts', 'Dinner', 'Starters', 'Vegan'],
      required: 'This field is required.'
   },
   image: {
      type:String,
      required: 'This field is required.'
   },
});
module.exports = mongoose.model('Recipe', recipeSchema);
