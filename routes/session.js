var express = require('express');
var router = express.Router();
var util = require('util');
var passport = require('passport');
var sessionvar = require('../models/session');

function isAlreadyAuth (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('session',{uname:req.user.name});
  } else {
     res.redirect('../login');
  }
};

router.get('/',isAlreadyAuth, function (req, res, next) {
  
  res.render('session',{uname:req.user.uname});
});

// 

// router.post('/data', passport.authenticate('local.newsession',{ failureRedirect: '/error' }),
//   function(req, res) {
//     res.redirect('../problems');
//   }); 
  // {
//   successRedirect: '../problems',
//   failureRedirect: '/session',
//   failureFlash: true,
// }));

router.post('/data', function(req,res,done){
    var messages = req.flash('error');
    // console.log(req.body.title);
    var title=req.body.title;
    if(title!=null){
      console.log("Session" +req.session.user);
      var newSession= new sessionvar();
  newSession.name= title;
newSession.timestamp =new Date();
newSession.userID=req.session.user;
    newSession.save(function (err, result) {
      if (err) {
        console.log(err);
        //return done(err);
         res.redirect('/session');
      } else {
        console.log("saving new session"+result);
         req.session.session_id=newSession.id;
    res.redirect('../problem/1/structure');
    
   
      //return done(null, title);
      }
    });
    }
   // res.render(req.baseUrl+'/problems', { errorOccured: messages.length > 0, errors: messages });
  
// router.get('/', function(req, res, next) {
//  res.redirect('/session');
});

// router.post('/ds', function (req, res, next) {
  
//   res.render('session',{uname:req.user.uname});
// });

router.get('/data',function(req,res){
    var messages = req.flash('error');
  res.redirect('problem/1/structure', { errorOccured: messages.length > 0, errors: messages });

// router.get('/', function(req, res, next) {
//  res.redirect('/session');
});




// router.get('/session_sg', function(req, res, next) {
//  var messages = req.flash('error');
//  res.render('session');
// });


module.exports = router;