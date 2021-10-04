class Remedies{
    constructor(dao){
        this.dao = dao;
    }

    createRemediesTable(){
        const sql = `CREATE TABLE IF NOT EXISTS remedies(
            id INTEGER PRIMARY KEY AUTOCOMPLETE,
            remedy_id TEXT NOT NULL,
            illness TEXT NOT NULL,
            remedy_name TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            likes INTEGER NOT NULL,
            dislikes INTEGER NOT NULL,
            status TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createIllnessTable(){
        const sql = `CREATE TABLE IF NOT EXISTS illness(
            id INTEGER PRIMARY KEY AUTOCOMPLETE,
            illness_id TEXT NOT NULL,
            illness TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    addRemedy(remedy_id, illness, remedy_name, description, image = "", likes = 0, dislikes = 0, status = "pending"){
        const sql = `INSERT INTO remedies (remedy_id, illness, remedy_name, description, image, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [remedy_id, illness, remedy_name, description, image, likes, dislikes, status];

        return this.dao.run(sql, params);

    }

    addIllness(illness_id, illness){
        const sql = `INSERT INTO illness (illness_id, illness) VALUES (?, ?)`;
        const params = [illness_id, illness];

        return this.dao.run(sql, params);

    }

    viewPendingRemedies(){
        const sql = `SELECT * FROM remedies WHERE status = ?`;
        const params = ["pending"];

        return this.dao.all(sql, params);
    }

    viewApprovedRemedies(){
        const sql = `SELECT * FROM remedies WHERE status = ?`;
        const params = ["approved"];

        return this.dao.all(sql, params);
    }

    approveRemedy(remedy_id){
        const sql = `UPDATE remedies SET status = ? WHERE remedy_id = ?`;
        const params = ["approved", remedy_id];

        return this.dao.run(sql, params);
    }

    updateLikes(remedy_id, likes){
        const sql = `UPDATE remedies SET likes = ? WHERE remedy_id = ?`;
        const params = [likes, remedy_id];

        return this.dao.run(sql, params);
    }

    updateDislikes(remedy_id, dislikes){
        const sql = `UPDATE remedies SET dislikes = ? WHERE remedy_id = ?`;
        const params = [dislikes, remedy_id];

        return this.dao.run(sql, params);
    }

    viewIllnesses(){
        const sql = `SELECT * FROM illness`;

        return this.dao.all(sql);
    }

    viewIllnessRemedy(illness){
        const sql = `SELECT * FROM remedies WHERE illness = ? AND status = ?`;
        const params = [illness, "approved"];

        return this.dao.all(sql, params);
    }

    viewRemedyDetails(remedy_id){
        const sql = `SELECT * FROM remedies WHERE remedy_id = ?`;
        const params = [remedy_id];

        return this.dao.get(sql, params);
    }

    
}

module.exports = Remedies;