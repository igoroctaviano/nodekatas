const express = require('express'),
      router = express.Router(),
      users = require('./users');

router.use('/users', users);

module.exports = router;