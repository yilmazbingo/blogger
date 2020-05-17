const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base");
const webpack = require("webpack");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: "development.env" });
} else if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "production.env" });
}

module.exports = merge(baseConfig, {
  entry: { main: "./src/client/client.js" },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
});
