require('../models/database');
const Category = require('../models/foodCategory');
const Recipe= require('../models/foodRecipe');

exports.aboutpage = async(req,res) => {
  res.render('about', { title:'Cooking Blog-about' } );
}


exports.homepage = async(req ,res ) => {
  try{
    const limitNumber = 5;
    const categories= await Category.find({}).limit(limitNumber);
    const latest=await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
    const food= { latest };
    res.render('index',{ title:'cooking blog-home',categories,food});
}catch(error){
  res.satus(500).send({message: error.message || "Error occured"})

}
}

exports.exploreCategories = async(req, res) => {
    try {
      const limitNumber = 20;
      const categories = await Category.find({}).limit(limitNumber);
      res.render('categories', { title: 'Cooking Blog - Categories', categories } );
    } catch (error) {
      res.satus(700).send({message: error.message || "Error Occured" });
    }
  } 



  exports.exploreRecipe = async(req, res) => {
    try {
      let recipeID = req.params.id;
      const recipe= await Recipe.findById(recipeID);


      res.render('recipe', { title: 'Cooking Blog -Recipe', recipe } );
    } catch (error) {
      res.status(700).send({message: error.message || "Error Occured" });
    }
  } 
  
  exports.explore = async(req, res) => {
    try {
      const limitNumber = 20;
      const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
      res.render('explore', { title: 'Cooking Blog - Explore', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
  } 
  
  exports.submit= async(req, res) => {
  const infoErrorObj=req.flash('infoError');
  const infoSubmitObj=req.flash('infoSubmit');

    res.render('submit', { title: 'Cooking Blog - Submit',infoErrorObj,infoSubmitObj } );
  }
  
 
  exports.submitOnPost= async(req, res) => {
    try{
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }

    
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName,
      });

      await newRecipe.save();

      req.flash('infoSubmit','Recipe has been added.');
      res.redirect('submit');
    }catch(error){
      req.json(error);
      req.flash('infoSubmit','Recipe has been added.');
      res.redirect('submit');
    }
 
  }

// async function insertDymmyCategoryData(){
//     try {
//         await Category.insertMany(
//         [
//             {
//                 "name":"Breakfast",
//                 "image":"download.jpg"
//             },
//             {
//                 "name":"NonVeg",
//                 "image":"OIP().jpg"
//             },
//             {
//                 "name":"Desserts",
//                 "image":"OIP(10).jpg"
//             },
//             {
//                 "name":"Lunch & Dinner",
//                 "image":"download(1).jpg"
//             },
//             {
//                 "name":"Starters",
//                 "image":"starter.jpg"
//             },
        
            
//         ]
//         );
//     } catch (error) {
//        console.log(' err',+ error) 
//     }
// }


// insertDymmyCategoryData();

// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "Italian Pizza",
//         "description": `Take yeast (7g) and sugar (1 tbsp), put them in a bowl, and mix with water (4 tbsp). Leave it in a warm place for 15 minutes. Mix flour (350g) with salt (1 tbsp) and make a well in the center; add olive oil (1 tbsp), yeast mixture, and 170-180g of hot water (60 degrees Celsius). Knead the dough with a wooden spoon.
//         Then turn out the dough onto a table and knead by hand for about 5 minutes.
//         Then put the dough back in the bowl, cover, and leave for 30 minutes to rise twice its size.
//         While the dough is rising, you can work on the filling.
//         Place tomatoes (canned in their own juice, 400g), crushed garlic (2 cloves), basil (2 tbsp), olive oil (1 tbsp), pepper, and salt in a large skillet.
//         Cook the resulting sauce for 20 minutes until thickened, then add tomato paste and let the sauce cool.
//         Once the base is ready, knead it by hand for another couple of minutes and place it on a baking sheet.
//         Stretch the dough by hand so that its thickness does not exceed 6 mm, as it will rise further in the oven.
//         Finally, cover the base with the sauce, sprinkle with mozzarella (100g) and grated Parmesan (2 tbsp), and place in a preheated oven, where it is baked for 20-25 minutes at 200 degrees Celsius.`,
//         "email": "recipeemail@pizza.co.it",
//         "ingredients": [
//           "Take yeast (7g) and sugar (1 tbsp)",
//           "Mix flour (350g) with salt (1 tbsp)",
//           "tomatoes (canned in their own juice, 400g)",
//           "crushed garlic (2 cloves) and basil (2 tbsp)",
//           "olive oil (1 tbsp), pepper, and salt",
//         ],
//         "category": "Breakfast", 
//         "image": "Traditional-foods-in-Italy_margherita-pizza.jpg"
//       },
//       { 
//         "name": "Coconut cake",
//         "description": ` Whisk together the cake flour, coconut milk powder, salt, and baking powder;
//         set aside.Combine the egg whites, milk, and flavors;
//         add 1/3 of the mixture to the ingredients in the bowl and mix until combined,Divide the batter 
//         between the two pans, and wrap the outsides with the soaked cake strips. If you don't have cake strips, place the pans in larger pans;
//         add water to the larger pans until it's halfway up
//         the sides of the cake pans. For 9" cakes, bake for 30 to 35 minutes; for 8" cakes, bake for 38 to 42 minutes,Remove the cakes from the oven and place on a rack;
//         remove the cake strips. Let the layers cool for 20 minutes, then turn out of the pan and return to the rack to finish cooling completely before filling and frosting.
//         Press some coconut onto the sides of the cake and sprinkle the remaining over the top.
//         Refrigerate the cake until ready to serve, and let it stand at room temperature for an hour before slicing and enjoying`,
//         "email": "recipeemail@cake.co.uk",
//         "ingredients": [
//           "1 ½ cups (210 g/7.5 oz) all-purpose flour",
//           "1 ½ teaspoons baking powder",
//           "¼ teaspoon salt",
//           "½ cup (1 stick/113 g) butter, softened",
//           "1 ¼ cups (250 g/8.8 oz) granulated sugar",
//           "zest of 1 lemon or lime",
//           "3 large eggs",
//           "1 teaspoon vanilla extract",
//           "1 tablespoon dark rum (optional)",
//           "1 cup (240 ml) coconut cream (unsweetened)",
//           "1 cup (100 g/3.5 oz) shredded (sweetened or unsweetened) or desiccated coconut",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Desserts", 
//         "image": "coc.jpg"
//       }
//       {}
//         "name": "Coconut cake",
//         "description": ` Whisk together the cake flour, coconut milk powder, salt, and baking powder;
//         set aside.Combine the egg whites, milk, and flavors;
//         add 1/3 of the mixture to the ingredients in the bowl and mix until combined,Divide the batter 
//         between the two pans, and wrap the outsides with the soaked cake strips. If you don't have cake strips, place the pans in larger pans;
//         add water to the larger pans until it's halfway up
//         the sides of the cake pans. For 9" cakes, bake for 30 to 35 minutes; for 8" cakes, bake for 38 to 42 minutes,Remove the cakes from the oven and place on a rack;
//         remove the cake strips. Let the layers cool for 20 minutes, then turn out of the pan and return to the rack to finish cooling completely before filling and frosting.
//         Press some coconut onto the sides of the cake and sprinkle the remaining over the top.
//         Refrigerate the cake until ready to serve, and let it stand at room temperature for an hour before slicing and enjoying`,
//         "email": "recipeemail@cake.co.uk",
//         "ingredients": [
//           "1 ½ cups (210 g/7.5 oz) all-purpose flour",
//           "1 ½ teaspoons baking powder",
//           "¼ teaspoon salt",
//           "½ cup (1 stick/113 g) butter, softened",
//           "1 ¼ cups (250 g/8.8 oz) granulated sugar",
//           "zest of 1 lemon or lime",
//           "3 large eggs",
//           "1 teaspoon vanilla extract",
//           "1 tablespoon dark rum (optional)",
//           "1 cup (240 ml) coconut cream (unsweetened)",
//           "1 cup (100 g/3.5 oz) shredded (sweetened or unsweetened) or desiccated coconut",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "Desserts", 
//         "image": "coc.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();
