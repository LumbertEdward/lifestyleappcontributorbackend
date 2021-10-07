const SqliteConnector = require('../models/sqliteconnection');
const DevotionsModel = require('../models/contributors/devotionals');
const conn = new SqliteConnector('./lifestyle');
const Devotion = new DevotionsModel(conn);
const { body,validationResult } = require('express-validator')

exports.AddDevotion = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.body.devotion_id
    var topic = req.body.topic
    var title = req.body.title
    var author = req.body.author
    var reading = req.body.reading
    var sermon = req.body.sermon
    var audiourl = req.body.audiourl
    var image = req.body.image

    Devotion.createDevotionalTable()
    .then(() => Devotion.addDevotion(devotion_id, topic, title, author, reading, sermon, audiourl, image))
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  
  }
}

exports.AddVerses = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.body.devotion_id
    var verse = req.body.verse
    
    Devotion.createVersesTable()
    .then(() => Devotion.addVerses(devotion_id, verse))
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  
  }
}

exports.AddTopic = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var topic = req.body.topic
    
    Devotion.createTopicsTable()
    .then(() => Devotion.addTopic(topic))
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  
  }
}

exports.ApproveDevotion = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.query.devotion_id
    
    Devotion.approveDevotion(devotion_id)
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  
  }
}

exports.UpdateDevotionLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.query.devotion_id
    var likes = req.query.likes
    
    Devotion.updateLikes(devotion_id, likes)
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  
  }
}

exports.UpdateDevotionDisLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.query.devotion_id
    var dislikes = req.query.dislikes
    
    Devotion.updateDislikes(devotion_id, dislikes)
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  
  }
}

exports.PendingDevotions = function(req, res) {
  Devotion.viewPendingDevotions()
  .then((data) => {
    res.json({"message": "true", "data": data.data});
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.ApprovedDevotions = function(req, res) {
  Devotion.viewApprovedDevotions()
  .then((data) => {
    res.json({"message": "true", "data": data.data});
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.ViewDevotionTopics = function(req, res) {
  Devotion.viewTopics()
  .then((data) => {
    res.json({"message": "true", "data": data.data});
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.ViewDevotionTopicTitles = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var topic = req.query.topic;
    Devotion.viewTopicTitles(topic)
    .then((data) => {
      res.json({"message": "true", "data": data.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.ViewDevotionSelectedTitle = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var title = req.query.title;
    Devotion.viewSelectedTitle(title)
    .then((data) => {
      res.json({"message": "true", "data": data.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.ViewDevotionVerses = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.query.devotion_id;
    Devotion.viewSelectedTitleVerses(devotion_id)
    .then((data) => {
      res.json({"message": "true", "data": data.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

