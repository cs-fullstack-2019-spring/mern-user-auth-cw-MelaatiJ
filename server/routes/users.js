var express = require('express');
var router = express.Router();

var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  userCollection.findById(id, function(err, user) {
    done(err, user);
  });
});
var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
};
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

router.get("/logout", (request, response) => {
  console.log(request.session);
  console.log(request.session.username);

  if(request.session.username) {
    response.send(request.session.username);
  }
  else
  {
    response.send(null);
  }
});

router.get("/logout", (request, response) => {
  console.log(request.session);

  if(request.session) {
    request.session = null;
    response.send("logged out");
  }
  else {
    response.send("not logged in");
  }
});



module.exports = router;
