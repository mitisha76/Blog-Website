const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("myblog");
  dbo.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

app.listen(8090, () => console.log(`Example app listening on port 8090!`));

app.post("/addUsers",function(req,res){
  var data=req.body;
  // console.log(data);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("users").insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("one row inserted");
      db.close();
    });

  });

})

app.get("/getUsers",function(req,res){
var result1;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("users").find({},{ projection: { username:1,_id :0}}).toArray(function(err, result) {
       result1=result;
      if (err) throw err;
      db.close();
      console.log("result");
    console.log(result1);
    res.json(result1);
    });

  });

})
app.post("/validateUser",function(req,res)
  {

    var user=req.body.user;
    var pass=req.body.pass;
    console.log(user+pass);
    var result1;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("myblog");
  //     dbo.collection("users").findOne({username:user,password:pass}).toArray(function(err, result) {
  //        result1=result;
  //       if (err) throw err;
  //       db.close();
  //     console.log(result1);
  //     if(result1.length==0){
  //       result1.json("0");
  //     }
  //     else{
  //       res.json("1");
  //     }

  //     });
  dbo.collection("users").findOne({username:user,password:pass}, function(err, result) {
    if (err) throw err;
    // console.log(result.username);
    console.log(result);
    if(result==null){
      res.json("0");
    }
    else{
      res.json("1");
    }
    db.close();
  });


  })
});
app.post("/addblog",function(req,res)
  {
    var data=req.body;
    // console.log(data);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("myblog");
      dbo.collection("blogs").insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("blog row inserted");
        db.close();
      });

    });
  })
app.post("/deleteblog",function(req,res)
{
  var id= req.body.id;
  var ObjectId = require('mongodb').ObjectId;
  var o_id = new ObjectId(id);
  console.log(req.body);
  console.log(id);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("blogs").remove({"_id": o_id}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
})
})


app.post("/profile/get",function(req,res){
  var u=req.body.user;
  var p =req.body.pass;
  console.log(u+p);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("users").findOne({username:u,password:p}, function(err, result) {
      if (err) throw err;
console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      console.log(result);
      res.json(result);
      db.close();
    });
})
})
app.post("/profile/getMyBlogs",function(req,res)
{
  var u=req.body.user;
  var p =req.body.pass;
  console.log(u+p);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("blogs").find({username:u,password:p}).toArray(function(err, result) {
      if (err) throw err;
console.log("profile");
      console.log(result);
      res.json(result);
      db.close();
    });
})
})
app.post("/myblogs/getblogById",function(req,res){
  var id= req.body.id;
  var ObjectId = require('mongodb').ObjectId;
  var o_id = new ObjectId(id);
  console.log(req.body);
  console.log(id);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("blogs").findOne({"_id": o_id}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
})

})


app.post("/myblogs/update",function(req,res){
  var id=req.body.id;
  var data=req.body.result;
  console.log(data);
  var title=data.title;
  var descr=data.body;
  var status=data.status;
  var ObjectId = require('mongodb').ObjectId;
  var o_id = new ObjectId(id);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    db.collection("blogs").update({"_id": o_id},
   {$set:{'title':title,"body":descr,"status":status}},{multi:true}),function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
  };
})
})

app.get("/profile/getblogsofpublic",function(req,res)
{

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("blogs").find({status:"public"}).toArray(function(err, result) {
      if (err) throw err;
console.log("profile");
      console.log(result);
      res.json(result);
      db.close();
    });
})
})


app.post("/profile/search",function(req,res)
{
  var key=req.body.key;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("users").find({username:{$regex:key,$options:"$i"}}).toArray(function(err, result) {
      if (err) throw err;
console.log("profileeeeeeeeeeeee");
      console.log(result);
      res.json(result);
      db.close();
    });
})
})
app.post("/myblogs/search",function(req,res)
{
  var key=req.body.key;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("blogs").find({title:{$regex:key,$options:"$i"}}).toArray(function(err, result) {
      if (err) throw err;
console.log("profileeeeeeeeeeeee");
      console.log(result);
      res.json(result);
      db.close();
    });
})
})
app.post("/profile/getuser",function(req,res)
{
  var x=req.body.key;
  console.log("gvdsc");
  console.log(x);
  var ObjectId = require('mongodb').ObjectId;
  var o_id = new ObjectId(x);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myblog");
    dbo.collection("users").findOne({"_id": o_id}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
})

})
