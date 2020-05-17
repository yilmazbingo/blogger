const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("Blog", blogSchema);

//For everything that uses mongoose models classes, we are not going to use require statements. Sometimes when you sue mongoose inside of the testing environment, sometimes your models files will be required into the project multiple times. Mongoose will get really confused when that happens and it will think that you are attempting to load in multiple models called User and then it will throw an error saying that you already loaded in.
