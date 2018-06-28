const mongoose = require("mongoose"),
      passport = require("passport"),
      router = require("express").Router(),
      auth = require("../auth"),
      User = mongoose.model("User");

const errorObject = (res, property) =>
  res.status(422).json({
    errors: {
      [property]: "is required"
    }
  });

// New user route (optional, everyone has access)
router.post("/", auth.optional, (req, res, next) => {
  const { body: { user: { email, password } } } = req;

  if (!email) {
    return errorObject(res, 'email');
  }

  if (!password) {
    return errorObject(res, 'password');
  }

  const finalUser = new User(user);
  finalUser.setPassword(user.password);

  return finalUser.save().then(() => {
    res.json({
      user: finalUser.toAuthJSON()
    });
  });
});

// Login route (optional, every has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user: { email, password } } } = req;

  if (!email) {
    return errorObject(res, 'email');
  }

  if (!password) {
    return errorObject(res, 'password');
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

// Current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then(user => {
      if (!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;