var express = require('express');
var router = express.Router();
var util = require('util');
var passport = require('passport');



function isAlreadyAuth (req, res, next) {
 // console.log("in auth "+ next);
  if (req.isAuthenticated()) {
    res.redirect('/session');
  } else {
    console.log("not authenticated");
    next();
  }
};


router.get('/register', function(req, res, next) {
  var messages = req.flash('error');
  console.log('in register');
  res.render('register', { errorOccured: messages.length > 0, errors: messages });
});
// router.get('/ses', function(req, res, next) {
//   var messages = req.flash('error');
//   res.render('session', { errorOccured: messages.length > 0, errors: messages });
// });



router.post('/register', passport.authenticate('local.register', {
  
  successRedirect: '/session',
  failureRedirect: '/register',
  failureFlash: true,
}));

router.get('/', isAlreadyAuth, function(req, res, next) {
  var messages = req.flash('error');
 // console.log(messages);
  res.render('login', { errorOccured: messages.length > 0, errors: messages });
})

router.post('/', passport.authenticate('local.login', {
  successRedirect: '/session',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/login_home', function(req, res, next) {
  res.render('/login_home',{uname:req.user.name});
});

router.get('/logout',function(req, res, next) {
  //req.session=null;
  // req.session.destroy();
  
   req.logout();
    req.session.destroy();
	  res.redirect('/');
  // req.session.destroy(function(err) {
  // // cannot access session here
  // if(err){
  //   console.log(err);
  //   res.render('logout.html');
  // }else{
  //   res.render('logout.html');
  // }
  
  
// })
    
})

module.exports = router;
