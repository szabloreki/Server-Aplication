const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const router = require('express').Router()

let userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  email: String,
});

let user = mongoose.model('user', userSchema);

module.exports = user;
