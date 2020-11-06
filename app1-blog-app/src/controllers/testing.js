"use strict"

const testing = require('express').Router()

const BlogModel = require('../models/blogs.js');
const UserModel = require('../models/users.js');
const logger = require('../utils/logger.js');
// const mongooseUtils = require("../utils/mongooseUtils.js");


testing.post('/reset',async(req,res,next) => {

  try{
    await BlogModel.deleteMany({});
    await UserModel.deleteMany({});

    res.status(204).send();
  } catch(e) {
    res.status(500).send({
      message: e.message || 'INTERNAL SERVER ERROR'
    })
  }

})

module.exports = testing