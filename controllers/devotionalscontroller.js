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
      if (data.data != null && data.data != undefined) {
        res.json({"message": "true"});
      }
      else{
        res.json({"message": "false", "error": "Data undefined"});
      }
    })
    .catch((err) => {
      res.json({"message": "false", "error": err});
      console.log(err);
    })
  
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.AddVerses = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.body.devotion_id
    var verse = req.body.verse

    if (devotion_id != null) {
      Devotion.createVersesTable()
      .then(() => Devotion.addVerses(devotion_id, verse))
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data undefined"});
        }
      })
      .catch((err) => {
        res.json({"message": "false", "error": err});
        console.log(err);
      })
    }
    else{
      res.json({"message": "false", "error": "Parameter Missing"});
    }  
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.AddTopic = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var topic = req.body.topic

    if (topic != null) {
      Devotion.createTopicsTable()
      .then(() => Devotion.addTopic(topic))
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data undefined"});
        }
      })
      .catch((err) => {
        res.json({"message": "false", "error": err});
        console.log(err);
      })
    } 
    else{
      res.json({"message": "false", "error": "Parameter Missing"});
    } 
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.ApproveDevotion = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.query.devotion_id

    if (devotion_id != null) {
      Devotion.approveDevotion(devotion_id)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data undefined"});
        }
      })
      .catch((err) => {
        res.json({"message": "false", "error": err});
        console.log(err);
      })
    } 
    else{
      res.json({"message": "false", "error": "Parameter Missing"});
    } 
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.UpdateDevotionLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.query.devotion_id
    var likes = req.query.likes

    if (devotion_id != null) {
      Devotion.updateLikes(devotion_id, likes)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data undefined"});
        }
      })
      .catch((err) => {
        res.json({"message": "false", "error": err});
        console.log(err);
      })
    }  
    else{
      res.json({"message": "false", "error": "Parameter Missing"});
    }
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.UpdateDevotionDisLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.query.devotion_id
    var dislikes = req.query.dislikes

    if (devotion_id != null) {
      Devotion.updateDislikes(devotion_id, dislikes)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data undefined"});
        }
      })
      .catch((err) => {
        res.json({"message": "false", "error": err});
        console.log(err);
      })
    }
    else{
      res.json({"message": "false", "error": "Parameter Missing"});
    }  
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.PendingDevotions = function(req, res) {
  Devotion.viewPendingDevotions()
  .then((data) => {
    if (data.data != null && data.data != undefined) {
      res.json({"message": "true", "data": data.data});
    }
    else{
      res.json({"message": "false", "error": "Data undefined"});
    }
  })
  .catch((err) => {
    res.json({"message": "false", "error": err});
    console.log(err);
  })
}

exports.ApprovedDevotions = function(req, res) {
  Devotion.viewApprovedDevotions()
  .then((data) => {
    if (data.data != null && data.data != undefined) {
      res.json({"message": "true", "data": data.data});
    }
    else{
      res.json({"message": "false", "error": "Data undefined"});
    }
  })
  .catch((err) => {
    res.json({"message": "false", "error": err});
    console.log(err);
  })
}

exports.ViewDevotionTopics = function(req, res) {
  Devotion.viewTopics()
  .then((data) => {
    if (data.data != null && data.data != undefined) {
      res.json({"message": "true", "data": data.data});
    }
    else{
      res.json({"message": "false", "error": "Data undefined"});
    }
  })
  .catch((err) => {
    res.json({"message": "false", "error": err});
    console.log(err);
  })
}

exports.ViewDevotionTopicTitles = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var topic = req.query.topic;

    if (topic != null) {
      Devotion.viewTopicTitles(topic)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true", "data": data.data});
        }
        else{
          res.json({"message": "false", "error": "Data undefined"});
        }
      })
      .catch((err) => {
        res.json({"message": "false", "error": err});
        console.log(err);
      })
    }
    else{
      res.json({"message": "false", "error": "Parameter Missing"});
    }
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.ViewDevotionSelectedTitle = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var title = req.query.title;

    if (title != null) {
      Devotion.viewSelectedTitle(title)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true", "data": data.data});
        }
        else{
          res.json({"message": "false", "error": "Data undefined"});
        }
      })
      .catch((err) => {
        res.json({"message": "false", "error": err});
      })
    }
    else{
      res.json({"message": "false", "error": "Parameter Missing"});
    }
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.ViewDevotionVerses = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var devotion_id = req.query.devotion_id;

    if (devotion_id != null) {
      Devotion.viewSelectedTitleVerses(devotion_id)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true", "data": data.data});
        }
        else{
          res.json({"message": "false", "error": "Data undefined"});
        }
        
      })
      .catch((err) => {
        res.json({"message": "false", "error": err});
        console.log(err);
      })
    }
    else{
      res.json({"message": "false", "error": "Parameter Missing"});
    }
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
    console.log("input error");
  }
}

