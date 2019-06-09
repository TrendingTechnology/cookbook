import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as admin from "firebase-admin";
import authenticationRouter from "./routes/authentication";
import recipesRouter from "./routes/recipes";
import usersRouter from "./routes/users";
import tagsRouter from "./routes/tags";
import { users } from "./helpers/db-helper";
import firebaseConfig from "./config/firebase";

// Initialize firebase configurations.
var serviceAccount = require("./config/firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
});

// Configure app.
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Add route security middleware.
const securedRoute = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const result = await admin.auth().verifyIdToken(token);

      const user = await users().findOne({
        uid: result.uid
      });

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).send("Unauthorized");
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};

app.use("/authentication", authenticationRouter);
app.use("/recipes", securedRoute, recipesRouter);
app.use("/users", securedRoute, usersRouter);
app.use("/tags", tagsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
