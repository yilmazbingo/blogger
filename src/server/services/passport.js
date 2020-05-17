const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = mongoose.model("User");

//This function is going to be automatically called by passport with our User model that we just fetched during querying a user. We are going to use that User model to generate our identifying piece of user information and after we do that we pass that information back to the passport and then passport will automatically stuff that token into the user’s cookie for us.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//When the client makes a request again, cookies will be automatically added to the request by the browser. Passport will take that token from the cookie and then pass it into a second function called deserializeUser in which we are going to take that identifying piece of information and turn it back into a User model that uniquely identifies that user. After the token gets passed into deserialize user, we somehow figure out what user that is.
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientID: process.env.GOOGLE_CLIENT_ID,

      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
        }).save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
