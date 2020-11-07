"use strict"

const testingRouter = require('express').Router()

const BlogModel = require('../models/blogs.js');
const UserModel = require('../models/users.js');
const logger = require('../utils/logger.js');
const bcrypt = require('bcrypt');
// const mongooseUtils = require("../utils/mongooseUtils.js");

testingRouter.get('/ping',(req,res,next) => {
  res.status(200).send();
})

testingRouter.post('/reset',async(req,res,next) => {

  try{
    await BlogModel.deleteMany({});
    await UserModel.deleteMany({});

    const testUserObj = {
      username: "testUsernameAlpha",
      name: "First Username",
      user_type: 'ADMIN',
      password: "testPass1"
    }

    const hashedPass = await bcrypt.hash(testUserObj.password,10);

    testUserObj.auth = {
      hash: hashedPass
    }
    delete testUserObj.password;

    await UserModel.insertOne(testUserObj)
    
    res.status(204).send();
  } catch(e) {
    res.status(500).send({
      message: e.message || 'INTERNAL SERVER ERROR'
    })
  }

})

module.exports = testingRouter