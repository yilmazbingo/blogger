import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(() => {
    "db error";
    process.exit(1);
  })
  .then(() => console.log("mongoose up and running"));
