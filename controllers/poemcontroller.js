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

    Poem.createPoemTable()
    .then(() => Poem.addPoem(poem_id, contributor_id, title, author, linecount))
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.AddLines = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.body.poem_id
    var line = req.body.line

    Poem.createPoemLinesTable()
    .then(() => Poem.addLines(poem_id, line))
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.AddAuthors = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var contributor_id = req.body.contributor_id
    var author_name = req.body.author_name

    Poem.createAuthorsTable()
    .then(() => Poem.addAuthors(contributor_id, author_name))
    .then((data) => {
      res.json({"message": "true"});
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.ApprovePoem = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.query.poem_id

    Poem.approvePoem(poem_id)
    .then((data) => {
      res.json({"message": "true"})
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.UpdateLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.query.poem_id
    var likes = req.query.likes

    Poem.updateLikes(poem_id, likes)
    .then((data) => {
      res.json({"message": "true"})
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.UpdateDisLikes = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.query.poem_id
    var dislikes = req.query.dislikes
    
    Poem.UpdateDisLikes(poem_id, dislikes)
    .then((data) => {
      res.json({"message": "true"})
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

exports.ViewPendingPoems = function(req, res) {
  Poem.viewPendingPoems()
  .then((data) => {
    res.json({"message": "true", "data": data.data});
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.ViewApprovedPoems = function(req, res) {
  Poem.viewApprovedPoems()
  .then((data) => {
    res.json({"message": "true", "data": data.data});
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.ViewAllPoems = function(req, res) {
  Poem.viewAllPoems()
  .then((data) => {
    res.json({"message": "true", "data": data.data});
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.ViewAllAuthors = function(req, res) {
  Poem.viewAllAuthors()
  .then((data) => {
    res.json({"message": "true", "data": data.data});
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.ViewAllTitles = function(req, res) {
  Poem.viewAllTitles()
  .then((data) => {
    res.json({"message": "true", "data": data.data});
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.ViewSelectedPoem = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var poem_id = req.query.poem_id

    Poem.viewSelectedPoem(poem_id)
    .then((data) => {
      res.json({"message": "true", "data": data.data});
    })
    .then((err) => {
      console.log(err);
    })
  }
}

exports.ViewSelectedAuthorTitle = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var contributor_id = req.query.contributor_id

    Poem.viewSelectedAuthorTitles(contributor_id)
    .then((data) => {
      res.json({"message": "true", "data": data.data});
    })
    .then((err) => {
      console.log(err);
    })
  }
}

exports.ViewSelectedTitle = function(req, res) {
  var errors = validationResult(req);
  if (errors.isEmpty) {
    var title = req.query.title

    Poem.viewSelectedTitle(title)
    .then((data) => {
      res.json({"message": "true", "data": data.data});
    })
    .then((err) => {
      console.log(err);
    })
  }
}