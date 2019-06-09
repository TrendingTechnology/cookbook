import { Router } from "express";
import { recipes, users } from "../helpers/db-helper";

var router = Router();

router.get("/", async (req, res) => {
  try {
    // Get the user
    const { user } = req;

    // Create an empty property if the user doesn't have any recipes.
    if (!user.recipes) {
      user.recipes = {};
    }

    // Return the user recipes if we've already generated them for this week.
    const lastSunday = getLastSunday();
    if (user.recipes.hasOwnProperty(lastSunday)) {
      return res
        .status(200)
        .send(await getRecipesFromIds(user.recipes[lastSunday]));
    }

    // Generate 7 recipes and add them to the user.
    const generatedRecipes = await generateRecipes();
    user.recipes[lastSunday] = generatedRecipes.map(x => x._id);
    await users().updateOne(
      {
        uid: user.uid
      },
      {
        $set: { recipes: user.recipes }
      }
    );

    return res.status(200).send(generatedRecipes);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const generateRecipes = async () => {
  return await recipes()
    .aggregate([{ $sample: { size: 7 } }])
    .toArray();
};

const getLastSunday = () => {
  const today = new Date();
  const day = today.getDay();

  let prevSunday;
  if (today.getDay() == 0) {
    prevSunday = new Date().setDate(today.getDate() - 7);
  } else {
    prevSunday = new Date().setDate(today.getDate() - day);
  }

  return new Date(prevSunday).toISOString().split("T")[0];
};

const getRecipesFromIds = async recipesIds => {
  return await recipes()
    .find({
      _id: {
        $in: recipesIds
      }
    })
    .toArray();
};

export default router;
