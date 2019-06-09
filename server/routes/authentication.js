import { Router } from "express";

import { users } from "../helpers/db-helper";
var router = Router();

router.post("/signup", async (req, res) => {
  await users().insertOne({
    uid: req.body.uid
  });
  return res.status(200).send(req.body);
});

export default router;
