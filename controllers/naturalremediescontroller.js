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
    var contributor_id = req.query.contributor_id
    var image = req.body.image
    
    if (remedy_id != null) {
      Remedies.createRemediesTable()
      .then(() => Remedies.addRemedy(contributor_id, remedy_id, illness, remedy_name, description, image))
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
      res.json({"message": "false", "error": "Field Missing"});
    }
    
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.AddIllness = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var illness = req.body.illness
    var illness_id = req.body.illness_id

    if (illness_id != null) {
      Remedies.createIllnessTable()
      .then(() => Remedies.addIllness(illness_id, illness))
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

exports.PendingRemedies = function(req, res) {
  Remedies.viewPendingRemedies()
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
    console.log(err)
  })
}

exports.ApprovedRemedies = function(req, res) {
  Remedies.viewApprovedRemedies()
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
    console.log(err)
  })
}

exports.ApproveRemedy = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var remedy_id = req.query.remedy_id

    if (remedy_id != null) {
      Remedies.approveRemedy(remedy_id)
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

exports.UpdateRemedyLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var remedy_id = req.query.remedy_id
    var likes = req.query.likes

    if (remedy_id != null) {
      Remedies.updateLikes(remedy_id, likes)
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

exports.UpdateRemedyDisLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var remedy_id = req.query.remedy_id
    var dislikes = req.query.dislikes

    if (remedy_id != null) {
      Remedies.updateDislikes(remedy_id, dislikes)
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

exports.ViewIllnesses = function(req, res) {
  Remedies.viewIllnesses()
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
    console.log(err)
  })
}

exports.ViewContributorRemedies = function(req, res) {
  var errors = validationResult(req)
  if (errors.isEmpty) {
    var contributor_id = req.query.contributor_id

    Remedies.viewContributorRemedies(contributor_id)
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
      console.log(err)
    })
  }
  else{
    res.json({"message": "false"});
  }
}

exports.ViewIllnessRemedy = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var illness_id = req.query.illness_id

    if (illness_id != null) {
      Remedies.viewIllnessRemedy(illness_id)
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
      res.json({"message": "false", "error": "Parameter missing"});
    }
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}

exports.ViewRemedyDetails = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var remedy_id = req.query.remedy_id

    if (remedy_id != null) {
      Remedies.viewRemedyDetails(remedy_id)
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
      res.json({"message": "false", "error": "Parameter missing"});
    }
  }
  else{
    res.json({"message": "false", "error": "Input Error"});
  }
}