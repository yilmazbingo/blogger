// const Home = require("./client/components/Home").default;

import express from "express";
import React from "react";
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";
import "regenerator-runtime/runtime";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
//-----------------------THIS IS VERY IMPORTANT--------------
// mongoose and user should be required before passport
import "./server/mongoose";
import "./server/models/User";
import "./server/services/passport";
import CookieSession from "cookie-session";
import passport from "passport";
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = require("express-http-proxy");
console.log(process.env.NODE_ENV);
process.env.GOOGlE_CLIENT_ID;

app.use(
  CookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //The list of keys to use to sign & verify cookie values. Set cookies are always signed with keys[0], while the other keys are valid for verification, allowing for key rotation.
    keys: process.env.COOKIE_KEY,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use("/auth", require("./server/routes/authRoutes"));

app.get("*", (req, res) => {
  //boot up location on the server side.
  const store = createStore();

  //some logic to initialzie and load data into the store
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null;
  });
  // console.log(promises);
  Promise.all(promises).then(() => {
    res.send(renderer(req, store));
  });

  //will return an array of components that about to be rendered
});

app.listen(3000, () => {
  console.log("listening on port 300");
});
