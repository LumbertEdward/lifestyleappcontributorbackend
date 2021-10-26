const SqliteConnector = require('../models/sqliteconnection');
const MealPlans = require('../models/contributors/mealplans');
const conn = new SqliteConnector('./lifestyle');
const Meals = new MealPlans(conn);
const { body,validationResult } = require('express-validator')

exports.AddMealPlan = function(req, res, next) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var plan_id = req.body.plan_id
        var name = req.body.name.toLowerCase()
        var category = req.body.category
        var bodytype = req.body.bodytype
        var weight = req.body.weight
        var body_goal = req.body.body_goal
        var minimum_age = req.body.minimum_age
        var maximum_age = req.body.maximum_age
        var date_added = req.body.date_added
        var contributor_id = req.body.contributor_id
        var image = req.body.image

        if (plan_id != null) {
            Meals.createMealPLanTable()
            .then(() => Meals.addMealPlan(plan_id, name, category, bodytype, weight, body_goal, minimum_age, maximum_age, date_added, contributor_id, image))
            .then((data) => {
                if (data) {
                    res.json({"message": "true"});
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input Error"})
        console.log("Errors");
    }
}

exports.AddDays = function(req, res, next) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var plan_id = req.body.plan_id
        var day_id = req.body.day_id
        var day = req.body.day

        if (plan_id != null) {
            Meals.createDaysTable()
            .then(() => Meals.addDays(day_id, plan_id, day))
            .then((data) => {
                if (data) {
                    res.json({"message": "true"});
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input Error"})
        console.log("Errors");
    }
}

exports.AddDuration = function(req, res, next) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var plan_id = req.body.plan_id
        var duration_id = req.body.duration_id
        var day_id = req.body.day_id
        var duration = req.body.duration

        if (plan_id != null) {
            Meals.createDurationsTable()
            .then(() => Meals.addDuration(plan_id, duration_id, day_id, duration))
            .then((data) => {
                if (data) {
                    res.json({"message": "true"});
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input Error"})
        console.log("Errors");
    }
}

exports.AddMeal = function(req, res, next) {
    var errors = validationResult(req);
    if (errors.isEmpty) {
        var plan_id = req.body.plan_id
        var meal_id = req.body.meal_id
        var duration_id = req.body.duration_id
        var name = req.body.name.toLowerCase()
        var description = req.body.description
        var image = req.body.image

        if (plan_id != null) {
            Meals.createDurationsTable()
            .then(() => Meals.addMeal(plan_id, meal_id, duration_id, name, description, image))
            .then((data) => {
                if (data.data != null && data.data != undefined) {
                    res.json({"message": "true"});
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input Error"})
        console.log("Errors");
    }
}

exports.AllMealPlans = function(req, res) {
    Meals.viewMealPlans()
    .then((data) => {
        if (data.data != undefined || data.data != null) {
            res.json({"message": "true", "data": data.data});
        }
        else{
            res.json({"message": "false", "error": "Data Undefined"})
        }
    })
    .catch((err) => {
        res.json({"message": "false", "error": err})
        console.log(err);
    })
}

exports.AllPendingMealPlans = function(req, res) {
    Meals.viewPendingMealPlans()
    .then((data) => {
        if (data.data != undefined || data.data != null) {
            res.json({"message": "true", "data": data.data});
        }
        else{
            res.json({"message": "false", "error": "Data Undefined"})
        }
    })
    .catch((err) => {
        res.json({"message": "false", "error": err})
        console.log(err);
    })
}

exports.AllApprovedMealPlans = function(req, res) {
    Meals.viewApprovedMealPlans()
    .then((data) => {
        if (data.data != undefined || data.data != null) {
            res.json({"message": "true", "data": data.data});
        }
        else{
            res.json({"message": "false", "error": "Data Undefined"})
        }
    })
    .catch((err) => {
        res.json({"message": "false", "error": err})
        console.log(err);
    })
}

exports.ViewContributorMealPlans = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var contributor_id = req.query.contributor_id

        if (contributor_id != null) {
            Meals.viewContributorMealPlan(contributor_id)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true", "data": data.data})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input Error"})
    }
}

exports.ViewMealPlanDetails = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var plan_id = req.query.plan_id

        if (plan_id != null) {
            Meals.viewMealPlanDetails(plan_id)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true", "data": data.data})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input Error"})
    }
}

exports.ViewMealPlanDays = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var plan_id = req.query.plan_id

        if (plan_id != null) {
            Meals.viewPlanDays(plan_id)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true", "data": data.data})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input Error"})
    }
}

exports.ViewDayDurations = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var day_id = req.query.day_id

        if (day_id != null) {
            Meals.viewDurations(day_id)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true", "data": data.data})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input Error"})
    }
}

exports.ViewMealDetails = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var duration_id = req.query.duration_id

        if (duration_id != null) {
            Meals.viewMealDetails(duration_id)
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true", "data": data.data})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err);
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input Error"})
    }
}

exports.UpdateMealPlan = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var plan_id = req.body.plan_id
        var name = req.body.name.toLowerCase()
        var bodytype = req.body.bodytype
        var weight = req.body.weight
        var body_goal = req.body.body_goal
        var minimum_age = req.body.minimum_age
        var maximum_age = req.body.maximum_age
        var image = req.body.image

        if (plan_id != null) {
            Meals.updateMealPlan(plan_id, name, bodytype, weight, body_goal, minimum_age, maximum_age, image)
            .then((data) => {
                if (data.data != null && data.data != undefined) {
                    res.json({"message": "true"})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input error"})
    }
}

exports.UpdateMeal = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var meal_id = req.body.meal_id
        var name = req.body.name.toLowerCase()
        var description = req.body.description
        var image = req.body.image

        if (meal_id != null) {
            Meals.updateMeal(meal_id, name, description, image)
            .then((data) => {
                if (data.data != null && data.data != undefined) {
                    res.json({"message": "true"})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input error"})
    }
}

exports.UpdateMealPlanStatus = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var plan_id = req.query.plan_id

        if (plan_id != null) {
            Meals.updateMealPlanStatus(plan_id)
            .then((data) => {
                if (data.data != null && data.data != undefined) {
                    res.json({"message": "true"})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input error"})
    }
}

exports.UpdateMealPlanLikes = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var plan_id = req.query.plan_id
        var likes = req.query.likes

        if (plan_id != null) {
            Meals.updateMealPlanLikes(plan_id, likes)
            .then((data) => {
                if (data.data != null && data.data != undefined) {
                    res.json({"message": "true"})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input error"})
    }
}

exports.UpdateMealPlanDisLikes = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var plan_id = req.query.plan_id
        var dislikes = req.query.dislikes

        if (plan_id != null) {
            Meals.updateMealPlanDisLikes(plan_id, dislikes)
            .then((data) => {
                if (data.data != null && data.data != undefined) {
                    res.json({"message": "true"})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Input error"})
    }
}

exports.UpdateMealLikes = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var meal_id = req.query.meal_id
        var likes = req.query.likes

        if (meal_id != null) {
            Meals.updateMealLikes(meal_id, likes)
            .then((data) => {
                if (data.data != null && data.data != undefined) {
                    res.json({"message": "true"})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
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
        res.json({"message": "false", "error": "Input error"})
    }
}

exports.UpdateMealDisLikes = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var meal_id = req.query.meal_id
        var dislikes = req.query.dislikes

        if (meal_id != null) {
            Meals.updateMealDisLikes(meal_id, dislikes)
            .then((data) => {
                if (data.data != null && data.data != undefined) {
                    res.json({"message": "true"})
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
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
        res.json({"message": "false", "error": "input error"})
    }
}

exports.DeletePlan = function(req, res) {
    var errors = validationResult(req)
    if (errors.isEmpty) {
        var plan_id = req.query.plan_id
        if (plan_id != null) {
            Meals.deleteMeal(plan_id)
            .then(() => Meals.deleteMealDurations(plan_id))
            .then(() => Meals.deleteMealDays(plan_id))
            .then(() => Meals.deleteMealPlan(plan_id))
            .then((data) => {
                if (data.data != null || data.data != undefined) {
                    res.json({"message": "true"})
                    console.log("deleted");
                }
                else{
                    res.json({"message": "false", "error": "Data Undefined"})
                }
            })
            .catch((err) => {
                res.json({"message": "false", "error": err})
                console.log(err)
            })
        }
        else{
            res.json({"message": "false", "error": "Parameter Missing"})
        }
    }
    else{
        res.json({"message": "false", "error": "Validation error"})
    }
}

