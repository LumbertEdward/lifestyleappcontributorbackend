const SqliteConnector = require('../models/sqliteconnection');
const PoemModel = require('../models/contributors/poems');
const conn = new SqliteConnector('./lifestyle');
const Poem = new PoemModel(conn);
const { body,validationResult } = require('express-validator')

exports.AddPoem = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.body.poem_id
    var contributor_id = req.body.contributor_id
    var title = req.body.title
    var author = req.body.author
    var linecount = req.body.linecount

    if (poem_id != null) {
      Poem.createPoemTable()
      .then(() => Poem.addPoem(poem_id, contributor_id, title, author, linecount))
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data Undefined"});
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

exports.AddLines = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.body.poem_id
    var line = req.body.line

    if (poem_id != null) {
      Poem.createPoemLinesTable()
      .then(() => Poem.addLines(poem_id, line))
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data Undefined"});
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

exports.AddAuthors = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var contributor_id = req.body.contributor_id
    var author_name = req.body.author_name

    if (contributor_id != null) {
      Poem.createAuthorsTable()
      .then(() => Poem.addAuthors(contributor_id, author_name))
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data Undefined"});
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

exports.ApprovePoem = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.query.poem_id

    if (poem_id) {
      Poem.approvePoem(poem_id)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data Undefined"});
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

exports.UpdateLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.query.poem_id
    var likes = req.query.likes

    if (poem_id != null) {
      Poem.updateLikes(poem_id, likes)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data Undefined"});
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

exports.UpdateDisLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.query.poem_id
    var dislikes = req.query.dislikes

    if (poem_id != null) {
      Poem.UpdateDisLikes(poem_id, dislikes)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true"});
        }
        else{
          res.json({"message": "false", "error": "Data Undefined"});
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

exports.ViewPendingPoems = function(req, res) {
  Poem.viewPendingPoems()
  .then((data) => {
    if (data.data != null && data.data != undefined) {
      res.json({"message": "true", "data": data.data});
    }
    else{
      res.json({"message": "false", "error": "Data Undefined"});
    }
  })
  .catch((err) => {
    res.json({"message": "false", "error": err});
    console.log(err);
  })
}

exports.ViewApprovedPoems = function(req, res) {
  Poem.viewApprovedPoems()
  .then((data) => {
    if (data.data != null && data.data != undefined) {
      res.json({"message": "true", "data": data.data});
    }
    else{
      res.json({"message": "false", "error": "Data Undefined"});
    }
  })
  .catch((err) => {
    res.json({"message": "false", "error": err});
    console.log(err);
  })
}

exports.ViewAllPoems = function(req, res) {
  Poem.viewAllPoems()
  .then((data) => {
    if (data.data != null && data.data != undefined) {
      res.json({"message": "true", "data": data.data});
    }
    else{
      res.json({"message": "false", "error": "Data Undefined"});
    }
  })
  .catch((err) => {
    res.json({"message": "false", "error": err});
    console.log(err);
  })
}

exports.ViewContributorPoems = function(req, res) {
  var errors = validationResult(req)
  if (errors.isEmpty) {
    var contributor_id = req.query.contributor_id

    Poem.viewContributorPoems(contributor_id)
    .then((data) => {
      if (data.data != null && data.data != undefined) {
        res.json({"message": "true", "data": data.data});
      }
      else{
        res.json({"message": "false", "error": "Data Undefined"});
      }
    })
    .catch((err) => {
      res.json({"message": "false", "error": err});
      console.log(err);
    })
  }
  else{
    res.json({"message": "false"});
  }
}

exports.ViewAllAuthors = function(req, res) {
  Poem.viewAllAuthors()
  .then((data) => {
    if (data.data != null && data.data != undefined) {
      res.json({"message": "true", "data": data.data});
    }
    else{
      res.json({"message": "false", "error": "Data Undefined"});
    }
  })
  .catch((err) => {
    res.json({"message": "false", "error": err});
    console.log(err);
  })
}

exports.ViewAllTitles = function(req, res) {
  Poem.viewAllTitles()
  .then((data) => {
    if (data.data != null && data.data != undefined) {
      res.json({"message": "true", "data": data.data});
    }
    else{
      res.json({"message": "false", "error": "Data Undefined"});
    }
  })
  .catch((err) => {
    res.json({"message": "false", "error": err});
    console.log(err);
  })
}

exports.ViewSelectedPoem = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.query.poem_id

    if (poem_id != null) {
      Poem.viewSelectedPoem(poem_id)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true", "data": data.data});
        }
        else{
          res.json({"message": "false", "error": "Data Undefined"});
        }
      })
      .then((err) => {
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

exports.ViewSelectedAuthorTitle = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var contributor_id = req.query.contributor_id

    if (contributor_id != null) {
      Poem.viewSelectedAuthorTitles(contributor_id)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true", "data": data.data});
        }
        else{
          res.json({"message": "false", "error": "Data Undefined"});
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

exports.ViewSelectedTitle = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var title = req.query.title

    if (title != null) {
      Poem.viewSelectedTitle(title)
      .then((data) => {
        if (data.data != null && data.data != undefined) {
          res.json({"message": "true", "data": data.data});
        }
        else{
          res.json({"message": "false", "error": "Data Undefined"});
        }
      })
      .then((err) => {
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