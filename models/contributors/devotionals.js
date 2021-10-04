class Devotionals{
    constructor(dao){
        this.dao = dao;
    }

    createDevotionalTable(){
        const sql = `CREATE TABLE IF NOT EXISTS devotions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            devotion_id TEXT NOT NULL,
            topic TEXT NOT NULL,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            reading TEXT NOT NULL,
            sermon TEXT NOT NULL,
            audiourl TEXT NOT NULL,
            likes INTEGER NOT NULL,
            dislikes INTEGER NOT NULL,
            image TEXT NOT NULL,
            status TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createVersesTable(){
        const sql = `CREATE TABLE IF NOT EXISTS verses(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            devotion_id TEXT NOT NULL,
            verse TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createTopicsTable(){
        const sql = `CREATE TABLE IF NOT EXISTS topics(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            topic TEXT NOT NULL
            
        )`;

        return this.dao.run(sql);
    }

    addDevotion(devotion_id, topic, title, author, reading, sermon, audiourl = "", likes = 0, dislikes = 0, image = "", status = "pending"){
        const sql = `INSERT INTO devotions (devotion_id, topic, title, author, reading, sermon, audiourl, likes, dislikes, image, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [devotion_id, topic, title, author, reading, sermon, audiourl, likes, dislikes, image, status];

        return this.dao.run(sql, params);
    }

    addVerses(devotion_id, verse){
        const sql = `INSERT INTO verses (devotion_id, verse) VALUES (?, ?)`;
        const params = [devotion_id, verse];

        return this.dao.run(sql, params);
    }

    addTopic(topic){
        const sql = `INSERT INTO topics (topic) VALUES (?)`;
        const params = [topic];

        return this.dao.run(sql, params);
    }

    approveDevotion(devotion_id){
        const sql = `UPDATE devotions SET status = ? WHERE devotion_id = ?`;
        const params = ["approved", devotion_id];

        return this.dao.run(sql, params);
    }

    updateLikes(devotion_id, likes){
        const sql = `UPDATE devotions SET likes = ? WHERE devotion_id = ?`;
        const params = [likes, devotion_id];

        return this.dao.run(sql, params);
    }

    updateDislikes(devotion_id, dislikes){
        const sql = `UPDATE devotions SET dislikes = ? WHERE devotion_id = ?`;
        const params = [dislikes, devotion_id];

        return this.dao.run(sql, params);
    }

    viewPendingDevotions(){
        const sql = `SELECT * FROM devotions WHERE status = ?`;
        const params = ["pending"];

        return this.dao.all(sql, params);
    }

    viewApprovedDevotions(){
        const sql = `SELECT * FROM devotions WHERE status = ?`;
        const params = ["approved"];

        return this.dao.all(sql, params);
    }

    viewTopics(){
        const sql = `SELECT * FROM topics`;

        return this.dao.all(sql);
    }

    viewTopicTitles(topic){
        const sql = `SELECT title FROM devotions WHERE topic = ?`;
        const params = [topic]

        return this.dao.all(sql, params);
    }

    viewSelectedTitle(title){
        const sql = `SELECT * FROM devotions WHERE title = ?`;
        const params = [title];

        return this.dao.get(sql, params);
    }

    viewSelectedTitleVerses(devotion_id){
        const sql = `SELECT * FROM devotions WHERE devotion_id = ?`;
        const params = [devotion_id];

        return this.dao.all(sql, params);
    }


}

module.exports = Devotionals;