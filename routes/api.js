var express = require('express');
var router = express.Router();
var path = require('path');
var Question = require('../models/question');
var Log = require('../models/log');

router.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("no auth");
    res.status = 200;
    req.flash('error', ['please authenticate first']);
    res.send(JSON.stringify({
      status: 'redirect',
      message: '/login'
    }));
  }
});

router.get('/problem/answer/',function(req,res){
  console.log(req.query.pageID);
 
 
   Question.find({
        sessionID: req.session.session_id,
        pageID: req.query.pageID,
		questionID: req.query.questionID
    }, null,  {
        sort: {
            timestamp: -1,
        }
    }, function (err, result) {
        if (err || !result)  {
            res.send(
                "error"+err
            );
        } else {
            //console.log(result);
            var answers = [];

            result.forEach(function (answer) {
                answers.push(answer.questionData.value)
            }, this);
            console.log(answers);
            res.send(JSON.stringify(
                answers)
            );
        }
    });
});

router.post('/problem/answer', function (req, res) {
  console.log(req);

  var newQuestion = {
    sessionID: req.session.session_id,
    questionID: req.body.pk,
    pageID: req.body.pageID,
	/** Urfa **/timestamp: new Date(),
    questionData: {
      value: req.body.value,
    }
  }

  Question.findOneAndUpdate({
    pageID: newQuestion.pageID,
    questionID: newQuestion.questionID,
    sessionID: newQuestion.sessionID,
	timestamp: newQuestion.timestamp
  }, newQuestion, {
    upsert: true,
    new: true,
    runValidators: true
  }, function (err, result) {

    if (err) {
      console.log(err);
      res.send(JSON.stringify({
        status: 'error',
        message: err
      }))
    } else {
      res.send(JSON.stringify({
        status: 'success'
      }));
    }
  });
});

router.post('/problem/log', function (req, res) {
  console.log(req.body);

  var newLog = {
    sessionID: req.session.session_id,
    pageID: req.body.pageID,
	timestamp: new Date(),
	logData: req.body.value
    /*logData: {
      value: req.body.value,
    }*/
  }

  Log.findOneAndUpdate({
    pageID: newLog.pageID,
    sessionID: newLog.sessionID,
	logData: newLog.logData,
	timestamp: newLog.timestamp
  }, newLog, {
    upsert: true,
    new: true,
    runValidators: true
  }, function (err, result) {

    if (err) {
      console.log(err);
      res.send(JSON.stringify({
        status: 'error',
        message: err
      }))
    } else {
      res.send(JSON.stringify({
        status: 'success'
      }));
    }
  });
});

module.exports = router;
