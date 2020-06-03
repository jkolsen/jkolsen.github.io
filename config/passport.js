var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
let ADMIN_KEY = '1234';

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  })
});

passport.use('local.login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, done) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password (min three char)').notEmpty().isLength({min: 3});

  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function (error) {
      messages.push(error.msg);
      console.log(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
//console.log(req);
  User.findOne({
    'email': email,
  }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'No user found, please register'
      });
    }
    if (!user.checkPassword(password)) {
      return done(null, false, {
        message: 'Incorrect Password'
      })
    } user.id
    console.log( user.id+' user found '+user);
    req.session.user = user.id;
    return done(null, user,req);
  });
}));

// passport.use('local.register', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   nameField:'name',
  
//   passReqToCallback: true
// }, function (req, email, password,name, done) {
//   req.checkBody('email', 'Invalid email').notEmpty().isEmail();
//   req.checkBody('name', 'name cannot be empty').notEmpty()
//   req.checkBody('password', 'Invalid password (min three char)').notEmpty().isLength({min: 3});
//   req.checkBody('passwordConfirm', 'Passwords must match').equals(req.body.password);
//   req.checkBody('adminKey', ' Admin Key mismatch, contact admin').notEmpty().equals(ADMIN_KEY);
// console.log("checking errors");
//   var errors = req.getValidationResult();
//   if (errors) {
//     var messages = [];
//     errors.forEach(function (error) {
//       messages.push(error.msg);
//     });
//     console.log(messages);
//     return done(null, false, req.flash('error',  errors));
//   }

//   User.findOne({
//     'email': email
//   }, function (err, user) {
//     if (err) {
//       return done(err);
//     }
//     if (user) {
//         return done(null, false, {
//         message: 'Email is already in use'
//       });
//     }
//     var newUser = new User();
//     newUser.email = email;
//     newUser.password = password;
//     newUser.name= name;
//     newUser.save(function (err, result) {
//       if (err) {
//         return done(err);
//       } else {
//         console.log(newUser);
//         done(null, newUser);
//       }
//     });
//   });
// }));
passport.use('local.register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
 
  passReqToCallback: true
}, function (req, email, password, done) {
  var name=req.body.name;
  req.checkBody('name', 'name cannot be empty').notEmpty();
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password (min three char)').notEmpty().isLength({min: 3});
  req.checkBody('passwordConfirm', 'Passwords must match').equals(req.body.password);
  req.checkBody('adminKey', ' Admin Key mismatch, contact admin').notEmpty().equals(ADMIN_KEY);

  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function (error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({
    'email': email
  }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
        return done(null, false, {
        message: 'Email is already in use'
      });
    }
    var newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.name= name;
    newUser.save(function (err, result) {
      if (err) {
        return done(err);
      } else {
        req.session.user = newUser.id;
        done(null, newUser,req);
      }
    });
  });
}));

passport.use('local.newsession', new LocalStrategy({
  sessonnameField: 'title',
    passReqToCallback: true
}, function (req, title, done) {
  // req.checkBody('title', 'Need title').notEmpty();
  // console.log("session validator");
  return done(null, title);

//   var errors = req.validationErrors();
//   if (errors) {
//     var messages = [];
//     errors.forEach(function (error) {
//       messages.push(error.msg);
//       console.log(error.msg);
//     });
//     return done(null, false, req.flash('error', messages));
//   }
  
//   User.findOne({
//     'email': req.session.email
//   }, function (err, user) {
//     if (err) {
//       return done(err);
//     }
//     if (user) {
//       //   return done(null, false, {
//       //   message: 'Email is already in use'
//       // });
    
//   var newSession= new Session();
//   newSession.name= title;
// newSession.timestamp =new Date();
// newSession.userID=user;
//     newSession.save(function (err, result) {
//       if (err) {
//         return done(err);
//       } else {
//         console.log("saving new session");
//       return done(null, title);
//       }
//     });
//     }
    
//   });
  
  
  
//console.log(req);
  
}));