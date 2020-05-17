// const Home = require("./client/components/Home").default;

import express from "express";
import React from "react";
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";
import "regenerator-runtime/runtime";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
const passport = require("passport");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = require("express-http-proxy");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "82029309763-pkpvj8blq8nqg46u6s4elna2fl6on66k.apps.googleusercontent.com",
      clientSecret: "xspMJELJly6TkilCjE4ktYQL",
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken) => console.log(accessToken)
  )
);
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:5000",
//     changeOrigin: true,
//   })
// );
// // app.use("/auth/google", proxy("http://localhost:5000"));

// app.use(
//   "/auth/google",
//   createProxyMiddleware({
//     target: "http://localhost:5000",
//   })
// );

// app.use(
//   ["/api", "/auth/google"],
//   createProxyMiddleware({
//     target: "http://127.0.0.1:5000",
//   })
// );

// app.use(
//   "/auth/google",
//   proxy("http://localhost:5000", {
//     proxyReqOptDecorator(opts) {
//       opts.header["x-forwarded-host"] = "localhost:3000";
//       return opts;
//     },
//   })
// );
app.use(express.static("public"));
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get("/auth/google/callback", passport.authenticate("google"));
//since we set public folder as static folder as soon as express sees the src="bundle.js" it will look into the public folder.

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
