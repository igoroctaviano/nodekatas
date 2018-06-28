const mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, (email, password, done) => {
  User.findOne({ email }).then(user => {
    return user && user.validatePassword(password) ?
      done(null, user) :
      done(null, false, {
        errors: { 'email or password': 'is invalid' }
      });
  });
}));