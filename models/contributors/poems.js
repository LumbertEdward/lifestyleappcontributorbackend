class Poems{
    constructor(dao){
        this.dao = dao;
    }

    createPoemTable(){
        const sql = `CREATE TABLE IF NOT EXISTS poems(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            poem_id TEXT NOT NULL,
            contributor_id TEXT NOT NULL,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            linecount INTEGER NOT NULL,
            likes INTEGER NOT NULL,
            dislikes INTEGER NOT NULL,
            status TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createPoemLinesTable(){
        const sql = `CREATE TABLE IF NOT EXISTS lines(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            poem_id TEXT NOT NULL,
            line TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createAuthorsTable(){
        const sql = `CREATE TABLE IF NOT EXISTS authors(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contributor_id TEXT NOT NULL,
            author_name TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    addPoem(poem_id, contributor_id, title, author, linecount, likes = 0, dislikes = 0, status = "pending"){
        const sql = `INSERT INTO poems (poem_id, contributor_id, title, author, linecount, status) VALUES (?, ?, ?, ?, ?. ?, ?, ?)`;
        const params = [poem_id, contributor_id, title, author, linecount, likes, dislikes, status];

        return this.dao.run(sql, params);
    }

    addLines(poem_id, line){
        const sql = `INSERT INTO lines (poem_id, line) VALUES (?, ?)`;
        const params = [poem_id, line];

        return this.dao.run(sql, params);
    }

    addAuthors(contributor_id, author_name){
        const sql = `INSERT INTO authors (contributor_id, author_name) VALUES (?, ?)`;
        const params = [contributor_id, author_name];

        return this.dao.run(sql, params);
    }

    approvePoem(poem_id){
        const sql = `UPDATE poems SET status = ? WHERE poem_id = ?`;
        const params = ["approved", poem_id];

        return this.dao.run(sql, params);
    }

    updateLikes(poem_id, likes){
        const sql = `UPDATE poems SET likes = ? WHERE poem_id = ?`;
        const params = [likes, poem_id];

        return this.dao.run(sql, params);
    }

    updateDislikes(poem_id, dislikes){
        const sql = `UPDATE poems SET dislikes = ? WHERE poem_id = ?`;
        const params = [dislikes, poem_id];

        return this.dao.run(sql, params);
    }

    viewPendingPoems(){
        const sql = `SELECT * FROM poems WHERE status = ?`;
        const params = ["pending"];
        
        return this.dao.all(sql, params);
    }

    viewApprovedPoems(){
        const sql = `SELECT * FROM poems WHERE status = ?`;
        const params = ["approved"];
        
        return this.dao.all(sql, params);
    }

    viewAllPoems(){
        const sql = `SELECT * FROM poems`;
        
        return this.dao.all(sql);
    }

    viewAllAuthors(){
        const sql = `SELECT * FROM authors`;
        
        return this.dao.all(sql);
    }

    viewAllTitles(){
        const sql = `SELECT title FROM poems`;
        
        return this.dao.all(sql);
    }

    viewSelectedPoem(poem_id){
        const sql = `SELECT * FROM poems WHERE poem_id = ?`;
        const params = [poem_id];
        
        return this.dao.get(sql, params);
    }

    viewSelectedAuthorTitles(contributor_id){
        const sql = `SELECT title FROM poems WHERE contributor_id = ? AND status = ?`;
        const params = [contributor_id, "approved"];
        
        return this.dao.all(sql, params);
    }

    viewSelectedTitle(title){
        const sql = `SELECT * FROM poems WHERE title = ?`;
        const params = [title];
        
        return this.dao.get(sql, params);
    }
}

module.exports = Poems;