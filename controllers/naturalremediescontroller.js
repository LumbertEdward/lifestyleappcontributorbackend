const SqliteConnector = require('../models/sqliteconnection');
const RemediesModel = require('../models/contributors/naturalremedies');
const conn = new SqliteConnector('./lifestyle');
const Remedies = new RemediesModel(conn);
const { body,validationResult } = require('express-validator')

exports.AddRemedy = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var remedy_id = req.body.remedy_id
    var illness = req.body.illness
    var remedy_name = req.body.remedy_name
    var description = req.body.description
    var image = req.body.image

    Remedies.createRemediesTable()
    .then(() => Remedies.addRemedy(remedy_id, illness, remedy_name, description, image))
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.AddIllness = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var illness = req.body.illness
    var illness_id = req.body.illness_id
    
    Remedies.createIllnessTable()
    .then(() => Remedies.addIllness(illness_id, illness))
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.PendingRemedies = function(req, res) {
  Remedies.viewPendingRemedies()
  .then((data) => {
    res.json({"message": "true", "data": data.data})
  })
  .catch((err) => {
    console.log(err)
  })
}

exports.ApprovedRemedies = function(req, res) {
  Remedies.viewApprovedRemedies()
  .then((data) => {
    res.json({"message": "true", "data": data.data})
  })
  .catch((err) => {
    console.log(err)
  })
}

exports.ApproveRemedy = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var remedy_id = req.query.remedy_id
    
    Remedies.approveRemedy(remedy_id)
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.UpdateRemedyLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var remedy_id = req.query.remedy_id
    var likes = req.query.likes
    
    Remedies.updateLikes(remedy_id, likes)
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.UpdateRemedyDisLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var remedy_id = req.query.remedy_id
    var dislikes = req.query.dislikes
    
    Remedies.updateDislikes(remedy_id, dislikes)
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.ViewIllnesses = function(req, res) {
  Remedies.viewIllnesses()
  .then((data) => {
    res.json({"message": "true", "data": data.data})
  })
  .catch((err) => {
    console.log(err)
  })
}

exports.ViewIllnessRemedy = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var illness_id = req.query.illness_id
    
    Remedies.viewIllnessRemedy(illness_id)
    .then((data) => {
      res.json({"message": "true", "data": data.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.ViewRemedyDetails = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var remedy_id = req.query.remedy_id
    
    Remedies.viewRemedyDetails(remedy_id)
    .then((data) => {
      res.json({"message": "true", "data": data.data});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}