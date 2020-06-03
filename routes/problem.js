var express = require('express');
var router = express.Router();
var path = require('path');
var Question = require('../models/question');

// serve static html
/* router.get('/*', function (req, res, next) {
    console.log(req.user._id + " --> " + req.originalUrl);
    Question.find({
        sessionID: req.session.session_id,
        pageID: req.originalUrl,
    }, null, {
        sort: {
            questionID: 1
        }
    }, function (err, result) {
        if (err || !result)  {
            res.render(req.originalUrl.slice(1), {
                hasData: false,
                answerData: null,
            });
        } else {
            console.log(result);
            var answers = [];

            result.forEach(function (answer) {
                answers.push(answer.questionData.value)
            }, this);
            console.log(answers);
            res.render(req.originalUrl.slice(1), {
                hasData: false,
                answerData: answers,
            });
        }
    });

    // res.sendFile(staticFileName, {
    //   root: path.join(__dirname, '../views')
    // });
    // res.sendFile(staticFileName, { root:/ path.join(__dirname, '../views') });
}); */

// serve static html
router.get('/*', function (req, res, next) {
    console.log(req.user._id + " --> " + req.originalUrl);
	var answers = [];
		
	var query = Question.where({sessionID: req.session.session_id,
        pageID: req.originalUrl});

    query.exec(function (err, result) {
        if (err || !result)  {
            res.render(req.originalUrl.slice(1), {
                hasData: false,
                answerData: null,
            });
        } else {
            console.log(result);
			Question.findOne({sessionID: req.session.session_id,
        pageID: req.originalUrl, questionID: 0},null, {sort: { timestamp: -1}},
			function (err,result0) {
				console.log(result0);
				if (err || !result0) {
					answers[0]= [];
				}
				else{
					answers[0] = result0.questionData.value;
				}
	});
	Question.findOne({sessionID: req.session.session_id,
        pageID: req.originalUrl, questionID: 1},null, {sort: { timestamp: -1}},
			function (err,result1) {
				console.log(result1);
				if (err || !result1) {
					answers[1] = [];
				}
				else{
					answers[1] = result1.questionData.value;
				}
	});
	Question.findOne({sessionID: req.session.session_id,
        pageID: req.originalUrl, questionID: 2},null, {sort: { timestamp: -1}},
			function (err,result2) {
				console.log(result2);
				if (err || !result2) {
					answers[2] = [];
				}
				else{
					answers[2] = result2.questionData.value;
				}
	});
	Question.findOne({sessionID: req.session.session_id,
        pageID: req.originalUrl, questionID: 3},null, {sort: { timestamp: -1}},
			function (err,result3) {
				console.log(result3);
				if (err || !result3) {
					answers[3] = [];
				}
				else{
					answers[3] = result3.questionData.value;
				}
	});	           

              console.log(answers);
			  res.render(req.originalUrl.slice(1), {
                hasData: false,
                answerData: answers,
            });
        }
    });          
});

module.exports = router;
