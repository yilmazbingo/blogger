const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
});

mongoose.model("User", userSchema);

//For everything that uses mongoose models classes, we are not going to use require statements. Sometimes when you sue mongoose inside of the testing environment, sometimes your models files will be required into the project multiple times. Mongoose will get really confused when that happens and it will think that you are attempting to load in multiple models called User and then it will throw an error saying that you already loaded in.
