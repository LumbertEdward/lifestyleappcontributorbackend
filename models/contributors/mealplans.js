class MealPlan{
    constructor(dao){
        this.dao = dao;
    }

    createMealPLanTable(){
        const sql = `CREATE TABLE IF NOT EXISTS mealplans(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            plan_id TEXT NOT NULL,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            bodytype TEXT NOT NULL,
            weight TEXT NOT NULL,
            body_goal TEXT NOT NULL,
            minimum_age INTEGER NOT NULL,
            maximum_age INTEGER NOT NULL,
            date_added TEXT NOT NULL,
            contributor_id TEXT NOT NULL,
            image TEXT NOT NULL,
            status TEXT NOT NULL,
            likes INTEGER NOT NULL,
            dislikes INTEGER NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createDurationsTable(){
        const sql = `CREATE TABLE IF NOT EXISTS durations(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            duration_id TEXT NOT NULL,
            plan_id TEXT NOT NULL,
            duration TEXT NOT NULL,
            day_id TEXT NOT NULL,
            image TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createDaysTable(){
        const sql = `CREATE TABLE IF NOT EXISTS days(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            day_id TEXT NOT NULL,
            plan_id TEXT NOT NULL,
            day INTEGER NOT NULL,
            image TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createMeal(){
        const sql = `CREATE TABLE IF NOT EXISTS meal(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            meal_id TEXT NOT NULL,
            plan_id TEXT NOT NULL,
            duration_id TEXT NOT NULL,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            likes INTEGER NOT NULL,
            dislikes INTEGER NOT NULL
        )`;

        return this.dao.run(sql);
    }

    addMealPlan(plan_id, name, category, bodytype, weight, body_goal, minimum_age, maximum_age, date_added, contributor_id, image, status = "pending", likes = 0, dislikes = 0){
        const sql = `INSERT INTO mealplans (plan_id, name, category, bodytype, weight, body_goal, minimum_age, maximum_age, date_added, contributor_id,image, status, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [plan_id, name, category, bodytype, weight, body_goal, minimum_age, maximum_age, date_added, contributor_id, image, status, likes, dislikes];

        return this.dao.run(sql, params);
    }

    addDuration(plan_id, duration_id, day_id, duration, image){
        const sql = `INSERT INTO durations (plan_id, duration_id, day_id, duration, image) VALUES (?, ?, ?, ?, ?)`;
        const params = [plan_id, duration_id, day_id, duration, image];

        return this.dao.run(sql, params);
    }

    addDays(day_id, plan_id, day, image){
        const sql = `INSERT INTO days (day_id, plan_id, day, image) VALUES (?, ?, ?, ?)`;
        const params = [day_id, plan_id, day, image];

        return this.dao.run(sql, params);
    }

    addMeal(plan_id, meal_id, duration_id, name, description, image, likes = 0, dislikes = 0){
        const sql = `INSERT INTO meal (meal_id, plan_id, duration_id, name, description, image, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [meal_id, plan_id, duration_id, name, description, image, likes, dislikes];

        return this.dao.run(sql, params);
    }

    viewMealPlanDetails(plan_id){
        const sql = `SELECT * FROM mealplans WHERE plan_id = ?`;
        const params = [plan_id];

        return this.dao.get(sql, params);
    }

    viewContributorMealPlan(contributor_id){
        const sql = `SELECT * FROM mealplans WHERE contributor_id = ?`;
        const params = [contributor_id];

        return this.dao.all(sql, params);
    }

    viewMealPlans(){
        const sql = `SELECT * FROM mealplans`;

        return this.dao.all(sql);
    }

    viewPendingMealPlans(){
        const sql = `SELECT * FROM mealplans WHERE status = "pending"`;

        return this.dao.all(sql);
    }

    viewApprovedMealPlans(){
        const sql = `SELECT * FROM mealplans WHERE status = "approved"`;

        return this.dao.all(sql);
    }

    viewPlanDays(plan_id){
        const sql = `SELECT * FROM days WHERE plan_id = ?`;
        const params = [plan_id];

        return this.dao.all(sql, params);
    }

    viewDurations(day_id){
        const sql = `SELECT * FROM durations WHERE day_id = ?`;
        const params = [day_id];

        return this.dao.all(sql, params);
    }

    viewMealDetails(duration_id){
        const sql = `SELECT * FROM meal WHERE duration_id = ?`;
        const params = [duration_id];

        return this.dao.get(sql, params);
    }

    deleteMealPlan(plan_id){
        const sql = `DELETE FROM mealplans WHERE plan_id = ?`;
        const params = [plan_id];

        return this.dao.run(sql, params);
    }

    deleteMealDays(plan_id){
        const sql = `DELETE FROM days WHERE plan_id = ?`;
        const params = [plan_id];

        return this.dao.run(sql, params);
    }

    deleteMeal(plan_id){
        const sql = `DELETE FROM meal WHERE plan_id = ?`;
        const params = [plan_id];

        return this.dao.run(sql, params);
    }

    deleteMealDurations(plan_id){
        const sql = `DELETE FROM durations WHERE plan_id = ?`;
        const params = [plan_id];

        return this.dao.run(sql, params);
    }

    updateMealPlanStatus(plan_id, status = "approved"){
        const sql = `UPDATE mealplans SET status = ? WHERE plan_id = ?`;
        const params = [status, plan_id]

        return this.dao.run(sql, params);
    }

    updateMealPlan(plan_id, name, bodytype, weight, body_goal, minimum_age, maximum_age, image = ""){
        const sql = `UPDATE mealplans SET name = ?, bodytype = ?, weight = ?, body_goal = ?, minimum_age = ?, maximum_age = ?, image = ? WHERE plan_id = ?`;
        const params = [name, bodytype, weight, body_goal, minimum_age, maximum_age, image, plan_id]

        return this.dao.run(sql, params);
    }

    updateMeal(meal_id, name, description, image){
        const sql = `UPDATE meal SET name = ?, description = ?, image = ? WHERE meal_id = ?`;
        const params = [name, description, image, meal_id]

        return this.dao.run(sql, params);
    }

    updateMealPlanLikes(plan_id, likes){
        const sql = `UPDATE mealplans SET likes = ? WHERE plan_id = ?`;
        const params = [likes, plan_id]

        return this.dao.run(sql, params);
    }

    updateMealPlanDisLikes(plan_id, dislikes){
        const sql = `UPDATE mealplans SET dislikes = ? WHERE plan_id = ?`;
        const params = [dislikes, plan_id]

        return this.dao.run(sql, params);
    }

    updateMealLikes(meal_id, likes){
        const sql = `UPDATE meal SET likes = ? WHERE meal_id = ?`;
        const params = [likes, meal_id]

        return this.dao.run(sql, params);
    }

    updateMealDisLikes(meal_id, dislikes){
        const sql = `UPDATE meal SET dislikes = ? WHERE meal_id = ?`;
        const params = [dislikes, meal_id]

        return this.dao.run(sql, params);
    }
}

module.exports = MealPlan;