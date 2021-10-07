class WorkOutPlan{
    constructor(dao){
        this.dao = dao;
    }

    createWorkOutPLanTable(){
        const sql = `CREATE TABLE IF NOT EXISTS workout(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workout_id TEXT NOT NULL,
            workout_name TEXT NOT NULL,
            days INTEGER NOT NULL,
            category TEXT NOT NULL,
            image TEXT NOT NULL,
            likes INTEGER NOT NULL,
            dislikes INTEGER NOT NULL,
            status TEXT NOT NULL

        )`;

        return this.dao.run(sql);
    }

    createWorkOutPLanDays(){
        const sql = `CREATE TABLE IF NOT EXISTS workoutdays(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workout_id TEXT NOT NULL,
            day_id TEXT NOT NULL,
            day TEXT NOT NULL,
            exercises INTEGER NOT NULL
            image TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createWorkOutPLanNumbers(){
        const sql = `CREATE TABLE IF NOT EXISTS workoutnumbers(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            day_id TEXT NOT NULL,
            number_id TEXT NOT NULL,
            number TEXT NOT NULL,
            image TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createWorkOutPLanExercise(){
        const sql = `CREATE TABLE IF NOT EXISTS workoutexercise(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            number_id TEXT NOT NULL,
            exercise_id TEXT NOT NULL,
            exercise_name TEXT NOT NULL,
            body_part TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL
            likes INTEGER NOT NULL,
            dislikes INTEGER NOT NULL
        )`;

        return this.dao.run(sql);
    }

    addWorkOut(workout_id, workout_name, days, category, image = "", likes = 0, dislikes = 0, status = "pending"){
        const sql = `INSERT INTO workout (workout_id, workout_name, days, category, image, likes, dislikes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [workout_id, workout_name, days, category, image, likes, dislikes, status];

        return this.dao.run(sql, params);
    }

    addWorkOutDays(workout_id, day_id, day, exercises, image = ""){
        const sql = `INSERT INTO workoutdays (workout_id, day_id, day, exercises, image) VALUES (?, ?, ?, ?, ?)`;
        const params = [workout_id, day_id, day, exercises, image];

        return this.dao.run(sql, params);
    }

    addWorkOutNumbers(day_id, number_id, number, image = ""){
        const sql = `INSERT INTO workoutnumbers (day_id, number_id, number, image) VALUES (?, ?, ?, ?)`;
        const params = [day_id, number_id, number, image];

        return this.dao.run(sql, params);
    }

    addWorkOutExercise(number_id, exercise_id, exercise_name, body_part, description, image = "", likes = 0, dislikes = 0){
        const sql = `INSERT INTO workoutexercise (number_id, exercise_id, exercise_name, body_part, description, image, likes, dislikes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [number_id, exercise_id, exercise_name, body_part, description, image, likes, dislikes];

        return this.dao.run(sql, params);
    }

    approveWorkOutPlan(workout_id){
        const sql = `UPDATE workout SET status = ? WHERE workout_id = ?`;
        const params = ["approved", workout_id];

        return this.dao.run(sql, params);
    }

    updateLikes(workout_id, likes){
        const sql = `UPDATE workout SET likes = ? WHERE workout_id = ?`;
        const params = [likes, workout_id];

        return this.dao.run(sql, params);
    }

    updateDislikes(workout_id, dislikes){
        const sql = `UPDATE workout SET dislikes = ? WHERE workout_id = ?`;
        const params = [dislikes, workout_id];

        return this.dao.run(sql, params);
    }

    updateExerciseLikes(exercise_id, likes){
        const sql = `UPDATE workoutexercise SET likes = ? WHERE exercise_id = ?`;
        const params = [likes, exercise_id];

        return this.dao.run(sql, params);
    }

    updateExerciseDislikes(exercise_id, dislikes){
        const sql = `UPDATE workoutexercise SET dislikes = ? WHERE exercise_id = ?`;
        const params = [dislikes, exercise_id];

        return this.dao.run(sql, params);
    }

    viewAllWorkouts(){
        const sql = `SELECT * FROM workout WHERE status = ?`;
        const params = ["approved"];

        return this.dao.all(sql, params);
    }

    viewWorkoutDays(workout_id){
        const sql = `SELECT * FROM workoutdays WHERE workout_id = ?`;
        const params = [workout_id]

        return this.dao.all(sql, params);
    }

    viewSelectedWorkoutDaysNumbers(day_id){
        const sql = `SELECT * FROM workoutnumbers WHERE day_id = ?`;
        const params = [day_id]

        return this.dao.all(sql, params);
    }

    viewSelectedExercise(number_id){
        const sql = `SELECT * FROM workoutexercise WHERE number_id = ?`;
        const params = [number_id]

        return this.dao.get(sql, params);
    }
}

module.exports = WorkOutPlan;