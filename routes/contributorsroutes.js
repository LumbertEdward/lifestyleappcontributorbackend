const express = require('express');
const { Register, AllContributors, Login, RegisterContributorEducation, RegisterContributorWorkExperience, UpdateContributor, UpdateContributorEarnings } = require('../controllers/contributorscontroller');
const { AddMealPlan, AddDays, AddDuration, AddMeal, AllMealPlans, ViewContributorMealPlans, ViewMealPlanDetails, ViewMealPlanDays, ViewDayDurations, ViewMealDetails, DeletePlan, AllPendingMealPlans, AllApprovedMealPlans, UpdateMeal, UpdateMealPlan, UpdateMealPlanLikes, UpdateMealPlanDisLikes, UpdateMealLikes, UpdateMealDisLikes, UpdateMealPlanStatus } = require('../controllers/mealplanscontrollers');
const router = express.Router();
const urlencodedparser = express.urlencoded({extended: false});

//account
router.post('/register', urlencodedparser, Register);
router.post('/register/education', urlencodedparser, RegisterContributorEducation);
router.post('/register/workexperience', urlencodedparser, RegisterContributorWorkExperience);
router.get('/login', Login);
router.post('/profile/edit', urlencodedparser, UpdateContributor);
router.get('/all', AllContributors);
router.get('/earnings/update', UpdateContributorEarnings);

//plans

//mealplan
router.post('/plans/mealplan/add', urlencodedparser, AddMealPlan);
router.post('/plans/meal/day/add', urlencodedparser, AddDays)
router.post('/plans/meal/duration/add', urlencodedparser, AddDuration)
router.post('/plans/meal/add', urlencodedparser, AddMeal)
router.get('/plans/meal/view/all', AllMealPlans)
router.get('/plans/meal/view/pending', AllPendingMealPlans)
router.get('/plans/meal/view/approved', AllApprovedMealPlans)
router.get('/plans/meal/view/contributors', ViewContributorMealPlans)
router.get('/plans/meal/view/mealplan/details', ViewMealPlanDetails)
router.get('/plans/meal/view/mealplan/days', ViewMealPlanDays)
router.get('/plans/meal/view/mealplan/day/durations', ViewDayDurations)
router.get('/plans/meal/view/mealplan/days/duration/meal', ViewMealDetails)
router.get('/plans/meal/update', UpdateMeal)
router.get('/plans/mealplan/update', UpdateMealPlan)
router.get('/plans/mealplan/likes/update', UpdateMealPlanLikes)
router.get('/plans/mealplan/dislikes/update', UpdateMealPlanDisLikes)
router.get('/plans/meal/likes/update', UpdateMealLikes)
router.get('/plans/meal/dislikes/update', UpdateMealDisLikes)
router.get('/plans/mealplan/status/update', UpdateMealPlanStatus)
router.get('/plans/meal/delete', DeletePlan)

//workouts
router.post('/plans/workout/add');

//devotionals
router.post('/devotionals/add');

//poems
router.post('/poems/add');

//natural remedies
router.post('/naturalremedies/add');



module.exports = router;
