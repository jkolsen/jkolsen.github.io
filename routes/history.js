var express = require('express');
var router = express.Router();
var util = require('util');
var passport = require('passport');
var sessionvar = require('../models/session');


function isAlreadyAuth (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
     res.redirect('../login');
  }
};

// router.get('/',isAlreadyAuth, function (req, res, next) {
  
//   res.render('session',{uname:req.user.uname});
// });

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
         res.redirect('../problems');
      } else {
        console.log("saving new session"+result);
         res.session_id=newSession.id;
    res.redirect('../problems');
    
   sessionvar.paginate({}, { page: 1, limit: 10 }).then(function(result) {
  console.log(result);
});
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

// router.get('/',function(req,res){
  
//   sessionvar.paginate({'userID':req.session.user}, { page: 1, limit: 10 }).then(function(result) {
     
//      console.log(result);
//      res.render('history.html')
     
//   });
  
// });

router.get('/list/:page', function(req, res, next) {
    var perPage = 10
    var page = req.params.page || 1
    
    console.log('user session ==='+req.session.user);
    sessionvar.paginate({'userID':req.session.user}, { page: page, limit: perPage }).then(function(result) {
     
     console.log(result);
     
    
     
     res.render('history',{list:result.docs, pagination: {
    page: result.page,       // The current page the user is on
    pageCount: result.pages  // The total number of available pages
  }});
     
     
      
   });
});


router.get('/updlist/:sess_id',function(req,res){
     req.session.session_id=req.params.sess_id;
    res.redirect('../../problems');


});
// router.get('/session_sg', function(req, res, next) {
//  var messages = req.flash('error');
//  res.render('session');
// });


module.exports = router;