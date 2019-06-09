import { MongoClient } from "mongodb";

import mongoConfig from "../config/mongo";

var db;
export const connect = done => {
  MongoClient.connect(
    mongoConfig.uri,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err;
      db = client.db(mongoConfig.db);
      done();
    }
  );
};
export const users = () => db.collection("users");
export const recipes = () => db.collection("recipes");
export const tags = () => db.collection("tags");
