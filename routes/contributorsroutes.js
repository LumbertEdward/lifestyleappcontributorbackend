const express = require('express');
const { Register, AllContributors, Login, RegisterContributorEducation, RegisterContributorWorkExperience, UpdateContributor, UpdateContributorEarnings, UpdateContributorEducation, UpdateContributorWorkExperience } = require('../controllers/contributorscontroller');
const { AddDevotion, AddVerses, AddTopic, ApproveDevotion, UpdateDevotionLikes, UpdateDevotionDisLikes, PendingDevotions, ApprovedDevotions, ViewDevotionTopics, ViewDevotionTopicTitles, ViewDevotionSelectedTitle, ViewDevotionVerses, ContributorDevotions } = require('../controllers/devotionalscontroller');
const { AddMealPlan, AddDays, AddDuration, AddMeal, AllMealPlans, ViewContributorMealPlans, ViewMealPlanDetails, ViewMealPlanDays, ViewDayDurations, ViewMealDetails, DeletePlan, AllPendingMealPlans, AllApprovedMealPlans, UpdateMeal, UpdateMealPlan, UpdateMealPlanLikes, UpdateMealPlanDisLikes, UpdateMealLikes, UpdateMealDisLikes, UpdateMealPlanStatus } = require('../controllers/mealplanscontrollers');
const { AddRemedy, AddIllness, PendingRemedies, ApprovedRemedies, ApproveRemedy, UpdateRemedyLikes, UpdateRemedyDisLikes, ViewIllnesses, ViewIllnessRemedy, ViewRemedyDetails } = require('../controllers/naturalremediescontroller');
const { AddPoem, AddLines, AddAuthors, ApprovePoem, UpdateLikes, UpdateDisLikes, ViewPendingPoems, ViewApprovedPoems, ViewAllPoems, ViewAllAuthors, ViewAllTitles, ViewSelectedPoem, ViewSelectedTitle, ViewSelectedAuthorTitle, ViewContributorPoems } = require('../controllers/poemcontroller');
const { AddWorkOutPlan, AddWorkOutPlanDays, AddWorkOutPlanNumbers, AddWorkOutPlanExercise, ApproveWorkOutPlan, UpdatePlanLikes, UpdatePlanDisLikes, UpdateExerciseLikes, UpdateExerciseDisLikes, ShowWorkOutPlans, ViewWorkOutPlanDays, ViewSelectedWorkOutPlanDaysExercises, ViewSelectedExercise, ShowContributorWorkOutPlans } = require('../controllers/workoutcontrollers');
const router = express.Router();
const urlencodedparser = express.urlencoded({extended: false});

//account
router.post('/register', urlencodedparser, Register);
router.post('/register/education', urlencodedparser, RegisterContributorEducation);
router.post('/register/workexperience', urlencodedparser, RegisterContributorWorkExperience);
router.get('/login', Login);
router.post('/profile/edit', urlencodedparser, UpdateContributor);
router.post('/education/edit', urlencodedparser, UpdateContributorEducation);
router.post('/workexperience/edit', urlencodedparser, UpdateContributorWorkExperience);
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
router.post('/plans/workout/add', urlencodedparser, AddWorkOutPlan);
router.post('/plans/workout/days/add', urlencodedparser, AddWorkOutPlanDays);
router.post('/plans/workout/exercises/add', urlencodedparser, AddWorkOutPlanNumbers);
router.post('/plans/workout/exercises/exercise/add', urlencodedparser, AddWorkOutPlanExercise);
router.get('/plans/workout/plan/approve', ApproveWorkOutPlan);
router.get('/plans/workout/plan/update/likes', UpdatePlanLikes);
router.get('/plans/workout/plan/update/dislikes', UpdatePlanDisLikes);
router.get('/plans/workout/plan/exercise/update/likes', UpdateExerciseLikes);
router.get('/plans/workout/plan/exercise/update/dislikes', UpdateExerciseDisLikes);
router.get('/plans/workout/all', ShowWorkOutPlans);
router.get('/plans/workout/contributor/all', ShowContributorWorkOutPlans);
router.get('/plans/workout/plan/days', ViewWorkOutPlanDays);
router.get('/plans/workout/plan/exercises', ViewSelectedWorkOutPlanDaysExercises);
router.get('/plans/workout/plan/exercises/exercise', ViewSelectedExercise);

//devotionals
router.post('/devotionals/add', urlencodedparser, AddDevotion);
router.post('/devotionals/verse/add', urlencodedparser, AddVerses);
router.post('/devotionals/topic/add', urlencodedparser, AddTopic);
router.get('/devotionals/devotion/approve', ApproveDevotion);
router.get('/devotionals/devotion/likes/update', UpdateDevotionLikes);
router.get('/devotionals/devotion/dislikes/update', UpdateDevotionDisLikes);
router.get('/devotionals/devotion/pending', PendingDevotions);
router.get('/devotionals/devotion/approved', ApprovedDevotions);
router.get('/devotionals/devotion/contributor', ContributorDevotions);
router.get('/devotionals/devotion/topics', ViewDevotionTopics);
router.get('/devotionals/devotion/topic/titles', ViewDevotionTopicTitles);
router.get('/devotionals/devotion/topic/titles/selected', ViewDevotionSelectedTitle);
router.get('/devotionals/devotion/topic/verses', ViewDevotionVerses);


//poems
router.post('/poems/add', urlencodedparser, AddPoem);
router.post('/poems/lines', urlencodedparser, AddLines);
router.post('/poems/author', urlencodedparser, AddAuthors);
router.get('/poems/approve', ApprovePoem);
router.get('/poems/likes/update', UpdateLikes);
router.get('/poems/dislikes/update', UpdateDisLikes);
router.get('/poems/pending', ViewPendingPoems);
router.get('/poems/approved', ViewApprovedPoems);
router.get('/poems/all', ViewAllPoems);
router.get('/poems/contributor/all', ViewContributorPoems);
router.get('/poems/all/authors', ViewAllAuthors);
router.get('/poems/all/titles', ViewAllTitles);
router.get('/poems/all/selected', ViewSelectedPoem);
router.get('/poems/all/author/selected', ViewSelectedAuthorTitle);
router.get('/poems/all/author/titles', ViewSelectedTitle);

//natural remedies
router.post('/naturalremedies/add', urlencodedparser, AddRemedy);
router.post('/naturalremedies/illness/add', urlencodedparser, AddIllness);
router.get('/naturalremedies/pending', PendingRemedies);
router.get('/naturalremedies/approved', ApprovedRemedies);
router.get('/naturalremedies/approve', ApproveRemedy);
router.get('/naturalremedies/remedy/likes/update', UpdateRemedyLikes);
router.get('/naturalremedies/remedy/dislikes/update', UpdateRemedyDisLikes);
router.get('/naturalremedies/remedy/illnesses', ViewIllnesses);
router.get('/naturalremedies/remedy/illnesses/remedy', ViewIllnessRemedy);
router.get('/naturalremedies/remedy/details', ViewRemedyDetails);



module.exports = router;
