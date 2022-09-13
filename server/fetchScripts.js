const { default: axios } = require("axios");
const { storeRecipe } = require("./user/controller");

const router = require("express").Router();

router.get("/fetch-recipes", async (req, res) => {
  try {
    const allmeals = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${
        req.query.a || "American"
      }`
    );
    allmeals.data.meals.map(async (m) => {
      let meal = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${m.idMeal}`
      );
      meal = meal.data.meals[0];

      let ingredients =
        Object.keys(meal).filter((e) => e.includes("strIngredient")) || [];
      ingredients = ingredients
        .map((e) => meal[e])
        .filter((e) => e)
        .join(", ");
      let measure =
        Object.keys(meal).filter((e) => e.includes("strMeasure")) || [];
      measure = measure
        .map((e) => meal[e])
        .filter((e) => e)
        .join(", ");

      const final = {
        mId: meal.idMeal,
        name: meal.strMeal,
        area: meal.strArea,
        category: meal.strCategory,
        thumbImg: meal.strMealThumb,
        instructions: meal.strInstructions,
        ingredients,
        measure,
        youtube: meal.strYoutube,
        tags: meal.strTags,
        source: meal.strSource,
        price: (Math.random() * (40 - 15) + 15).toFixed(2) * 1,
      };

      await storeRecipe(meal.idMeal, final);
    });
    res.send("fetched and stored in fb");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
