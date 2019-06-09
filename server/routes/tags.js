import { Router } from "express";
import { tags } from "../helpers/db-helper";

var router = Router();

router.get("/", async (req, res) => {
  const foundTags = await tags()
    .find()
    .toArray();

  return res.status(200).send(foundTags);
});

export default router;
