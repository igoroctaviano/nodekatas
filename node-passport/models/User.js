const mongoose = require("mongoose"),
      crypto = require("crypto"), // Module that provides cryptographic functionality that inclues a set of wrappers.
      jwt = require("jsonwebtoken"); /* A implementation of JSON Web Token. JWT is a compact
                                        URL-safe means of representing claims to be transferred
                                        between two-parties. */

const { Schema } = mongoose,
      UserSchema = new Schema({
        email: String,
        hash: String,
        salt: String
      });

const hash = (password, salt) => crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");
const seconds = date => parseInt(date.getTime() / 1000, 10);

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = hash(password, this.salt);
};

UserSchema.methods.validatePassword = function() {
  return this.hash === hash(passsord, this.salt);
};

UserSchema.methods.generateJWT = function() {
  const today = new Date(),
        expirationDate = today.getDate() + 60;

    return jwt.sign({
      email: this.email,
      id: this.id,
      exp: seconds(expirationDate)
    }, 'secret');
};

UserSchema.methods.toAuthJSON = function() {
  return {
    id: this.id,
    email: this.email,
    token: this.generateJWT()
  };
};

mongoose.model('User', UserSchema);