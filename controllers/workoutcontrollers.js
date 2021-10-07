const SqliteConnector = require('../models/sqliteconnection');
const WorkOutPlan = require('../models/contributors/workoutplans');
const conn = new SqliteConnector('./lifestyle');
const WorkOut = new WorkOutPlan(conn);
const { body,validationResult } = require('express-validator')

exports.AddWorkOutPlan = function(req, res) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var workout_id = req.body.workout_id
        var workout_name = req.body.workout_name
        var days = req.body.days
        var category = req.body.category
        var image = req.body.image

        if (workout_id != null) {
            WorkOut.createWorkOutPLanTable()
            .then(() => WorkOut.addWorkOut(workout_id, workout_name, days, category, image))
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"});
                    console.log(data);
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"});
                    console.log(data);
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

exports.AddWorkOutPlanDays = function(req, res) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var workout_id = req.body.workout_id
        var day_id = req.body.day_id
        var day = req.body.day
        var exercises = req.body.exercises
        var image = req.body.image;

        if (workout_id != null) {
            WorkOut.createWorkOutPLanDays()
            .then(() => WorkOut.addWorkOutDays(workout_id, day_id, day, exercises, image))
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"});
                    console.log(data);
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"});
                    console.log(data);
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

exports.AddWorkOutPlanNumbers = function(req, res) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var number_id = req.body.number_id
        var day_id = req.body.day_id
        var number = req.body.number
        var image = req.body.image

        if (number_id != null) {
            WorkOut.createWorkOutPLanNumbers()
            .then(() => WorkOut.addWorkOutNumbers(day_id, number_id, number, image))
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"});
                    console.log(data);
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"});
                    console.log(data);
                }
                
            })
            .catch((err) => {
                res.json({"message": "false", "error": err});
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Paramater Missing"});

        }  
    }
    else{
        res.json({"message": "false", "error": "Input Error"});
    }
}

exports.AddWorkOutPlanExercise = function(req, res) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var number_id = req.body.number_id
        var exercise_id = req.body.exercise_id
        var exercise_name = req.body.exercise_name
        var body_part = req.body.body_part
        var description = req.body.description
        var image = req.body.image

        if (number_id != null) {
            WorkOut.createWorkOutPLanExercise()
            .then(() => WorkOut.addWorkOutExercise(number_id, exercise_id, exercise_name, body_part, description, image))
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"});
                    console.log(data);
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"});
                    console.log(data);
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

exports.ApproveWorkOutPlan = function(req, res) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var workout_id = req.query.workout_id

        if (workout_id != null) {
            WorkOut.approveWorkOutPlan(workout_id)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"});
                    console.log(data);
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"});
                    console.log(data);
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

exports.UpdatePlanLikes = function(req, res) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var workout_id = req.query.workout_id
        var likes = req.query.likes

        if (workout_id != null) {
            WorkOut.updateLikes(workout_id, likes)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"});
                    console.log(data);
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"});
                    console.log(data);
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

exports.UpdatePlanDisLikes = function(req, res) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var workout_id = req.query.workout_id
        var dislikes = req.query.dislikes

        if (workout_id != null) {
            WorkOut.updateDislikes(workout_id, dislikes)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"});
                    console.log(data);
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"});
                    console.log(data);
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

exports.UpdateExerciseLikes = function(req, res) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var exercise_id = req.query.exercise_id
        var likes = req.body.likes

        if (exercise_id != null) {
            WorkOut.updateExerciseLikes(exercise_id, likes)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"});
                    console.log(data);
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"});
                    console.log(data);
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

exports.UpdateExerciseDisLikes = function(req, res) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var exercise_id = req.query.exercise_id
        var dislikes = req.body.dislikes

        if (exercise_id != null) {
            WorkOut.updateExerciseDislikes(exercise_id, dislikes)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"});
                    console.log(data);
                }
                else{
                    res.json({"message": "false", "error": "Data Udefined"});
                    console.log(data);
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

exports.ShowWorkOutPlans = function(req, res) {
    WorkOut.viewAllWorkouts()
    .then((data) => {
        if (data.data != undefined || data.data != null) {
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

exports.ViewWorkOutPlanDays = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var workout_id = req.query.workout_id

        if (workout_id != null) {
            WorkOut.viewWorkoutDays(workout_id)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true", "data": data.data})
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
        res.json({"message": "false", "error": "Input Errors"})
    }
}

exports.ViewSelectedWorkOutPlanDaysExercises = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var day_id = req.query.day_id

        if (day_id != null) {
            WorkOut.viewSelectedWorkoutDaysNumbers(day_id)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true", "data": data.data})
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
        res.json({"message": "false", "error": "Input Errors"});
    }
}

exports.ViewSelectedExercise = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var number_id = req.query.number_id

        if (number_id != null) {
            WorkOut.viewSelectedExercise(number_id)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true", "data": data.data})
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
        res.json({"message": "false", "error": "Input Errors"});
    }
}