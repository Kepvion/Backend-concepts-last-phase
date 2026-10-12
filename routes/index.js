var express = require('express');
var router = express.Router();

const localStrategy = require("passport-local");
const userModel = require("./users");
const passport = require('passport');

passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */


router.get('/', function(req, res) {
  res.render('index');
});



router.get('/failed', function(req, res) {
  req.flash("age",22);
  res.send("ban gaya ");
});

router.get('/check', function(req, res) {
  console.log(req.flash("age"));
  res.send("check backend ke terminal par")
});


router.get('/create', async function (req, res) {
  let userdata = await userModel.create([
    {
      username: "Priyanka",
      nickname: "Pri",
      description: "Learning backend development and looking for a job",
      categories: ["js", "node", "react", "gsap", "modern animations"]
    },
    {
      username: "Rahul",
      nickname: "Rj",
      description: "Java developer interested in building REST APIs",
      categories: ["java", "spring boot", "sql"]
    },
    {
      username: "Ananya",
      nickname: "Anu",
      description: "Frontend developer who loves UI design",
      categories: ["html", "css", "react", "figma"]
    },
    {
      username: "Karan",
      nickname: "K",
      description: "Full stack developer exploring databases",
      categories: ["node", "express", "mongodb", "react"]
    },
    {
      username: "Aman",
      nickname: "Ace",
      description: "Competitive programmer learning data structures",
      categories: ["cpp", "dsa", "leetcode", "algorithms"]
    }
  ]);

  res.send(userdata);
});


//not case insensitive 


// router.get("/find",async function(req,res){
//  let user = await userModel.find({username:"Priyanka"}); 
// res.send(user);
// });


//case insensitive ke liye

// router.get("/find",async function(req,res){
//   // new RegExp(search,flags)//use this
//   var regex = new RegExp("^Priyanka$",'i'); //i is insensitive way
// //  let user = await userModel.find({username:regex}); 
// res.send(user);
// });


//array field contains all of a set of values
// router.get("/find",async function(req,res){
  
//   let user = await userModel.find({
//     categories: { $all: ['sql' ] }
//   });
// res.send(user);


// });

//search for a document with a specific date range in mongoose
// router.get("/find",async function(req,res){
  
//   var date1 = new Date('2026-10-11');
//    var date2 = new Date('2026-10-12');
//    let user = await userModel.find({datecreated:{$gte: date1, $lte:date2}})
// res.send(user);


// });

//filter documents based on the existence of a field in mongoose

// router.get("/find",async function(req,res){
  
//   let user = await userModel.find({
//     categories: { $exists :true }
//   });
// res.send(user);


// });


//filter document based on a specific field's lenght in mongoose?

router.get("/find",async function(req,res){
  
  let user = await userModel.find({
    $expr:{
      $and:[
        {$gte:[{$strLenCP:'$nickname'},0] },
        {$lte: [{$strLenCP:'$nickname'},1] }
      ]
    }

  });

res.send(user);


});


router.post('/register',function(req,res){
  var userdata = new userModel({
    username:req.body.username,
    secret :req.body.secret
  });


  userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile');
    })
  })
});


 

router.get('/profile',isLoggedIn, function(req, res) {
    res.send("welcome to profile" );
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();

  }
  res.redirect("/");
}
module.exports = router;


