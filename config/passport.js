const mongojs = require('mongojs');
const db = mongojs('workers', ['users','login']);
const path = require('path');
const router = require('express').Router()
const passport = require('passport')LocalStrategy = require('passport-local').Strategy;


module.exports = router;
