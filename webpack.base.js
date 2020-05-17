const path = require("path");
const webpack = require("webpack");

process.env.NODE_ENV === "development"
  ? require("dotenv").config({ path: "development.env" })
  : require("dotenv").config({ path: "production.env" });

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-proposal-function-bind",
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.GOOGLE_CLIENT_ID": JSON.stringify(
        process.env.GOOGLE_CLIENT_ID
      ),
      "process.env.GOOGLE_CLIENT_SECRET": JSON.stringify(
        process.env.GOOGLE_CLIENT_SECRET
      ),
      "process.env.COOKIE_KEY": JSON.stringify(process.env.COOKIE_KEY),
    }),
  ],
};
