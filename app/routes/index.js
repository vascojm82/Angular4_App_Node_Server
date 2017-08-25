'use strict';
const router = require('express').Router(); //Router() is a function, don't forget to invoke it or it will fail
const db = require('../db');
const postModel = db.postModel;
const commentModel = db.commentModel;


router.get('/', function (req, res) {
  res.send('Hello World!');
});

//Get all posts
router.get('/posts', (req, res) => {
  	postModel.find({}, (err,response) => {
          let param = {
            posts: [],
            count: 0
          }

          if(response){
              param.posts = response;
              postModel.count({}, (err,response) => {
                    if(response){
                      param.count = response;
                      res.send(param);
                    }
                    else if(err)
                        throw 'Count Error: ' + err;
              });
          }
          else if(err){
              param.posts = err;
              param.count = 0;
              res.send(param);
          }
    });
});

//Get all posts by a single user
router.get('/posts/user/:userId', (req, res) => {
    var userId = req.params.userId;		//req.query.id;
  	postModel.find({"userId": userId}, (err,response) => {
          let param = {
            posts: [],
            count: 0
          }

          if(response){
              param.posts = response;
              postModel.count({"userId": userId}, (err,response) => {
                    if(response){
                      param.count = response;
                      res.send(param);
                    }
                    else if(err)
                        throw 'Count Error: ' + err;
              });
          }
          else if(err){
              param.posts = err;
              param.count = 0;
              res.send(param);
          }
    });
});

//Get the last post for a specific user
router.get('/posts/user/last/:userId', function (req, res) {
  var userId = req.params.userId;		//req.query.id;

  postModel.findOne({"userId": userId}).sort('-id').exec(function(err, response) {
      // item.id is the max value
      if(response)
          res.send(response);
      else if(err)
          res.send(err);
  });
})

//Get post by id
router.get('/posts/:id', function (req, res) {
    var id = req.params.id;		//req.query.id;
    postModel.find({"id" : id},function(err,response){
        if(response)
            res.send(response);
        else if(err)
            res.send(err);
    })
});

//Get all comments by postId
router.get('/comments/:postId', function (req, res) {
    var postId = req.params.postId;		//req.query.id;
    commentModel.find({"postId" : postId},function(err,response){
        if(response)
            res.send(response);
        else if(err)
          res.send(err);
    })
});

//Add New Post
router.post('/post', function(req,res){
    var dataObj = req.body;
    console.log("dataObj: " + JSON.stringify(dataObj));

    var post = new postModel(dataObj);
        post.save(function(err,response)
        {
            if(response)
            {
                console.log("New Post inserted successfully.");
                res.send(response);
            }
            else if(err)
                res.send(err);

        });
});

let route = () => {
  return router;
}

module.exports = route
