"use strict"

const testingRouter = require('express').Router()

const BlogModel = require('../models/blogs.js');
const UserModel = require('../models/users.js');

const mongooseUtils = require('../utils/mongooseUtils.js');
const logger = require('../utils/logger.js');
const bcrypt = require('bcrypt');
// const mongooseUtils = require("../utils/mongooseUtils.js");

testingRouter.get('/ping',(req,res,next) => {
  res.status(200).send();
})

const TEST_BLOG_SETS = {
  "DEFAULT": [],
  "SET1": [{
    "title": "Mock Blog Title",
    "author": "Random Author",
    "url": "https://www.mockblog.com/123456",
    "likes": 4
  },{
    "title" : "Another blog",
    "url" : "http://adflkj.sdlfkja.lkjdf",
    "likes" : 2,
    "author" : "Bloggy McBloggison",
  },{
    "title" : "THE NATION WANT TO KNOW",
    "url" : "http://arnub.barnub.com",
    "likes" : 3,
    "author" : "Blognab GoBlamy"
  }]
}


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

    const testUser = new UserModel(testUserObj)

    const testUserSaveResult = await testUser.save()

    const testBlogSet = TEST_BLOG_SETS[req.query.blogset || "DEFAULT"]

    if(testBlogSet.length>0){
      testBlogSet.forEach(testBlog => {
        testBlog.userId = mongooseUtils.getObjectId(testUserSaveResult._id)
      })
      await BlogModel.insertMany(testBlogSet);
    }

    
    
    res.status(204).send();
  } catch(e) {
    res.status(500).send({
      message: e.message || 'INTERNAL SERVER ERROR'
    })
  }

})

module.exports = testingRouter