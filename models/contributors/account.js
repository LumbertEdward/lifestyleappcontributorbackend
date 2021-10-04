class ContributorsAccount{
    constructor(dao){
        this.dao = dao;
    }

    createContributorTable(){
        const sql = `CREATE TABLE IF NOT EXISTS contributors(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contributor_id TEXT NOT NULL,
            firstname TEXT NOT NULL,
            lastname TEXT NOT NULL,
            email TEXT NOT NULL,
            username TEXT NOT NULL,
            profile_pic TEXT NOT NULL,
            age TEXT NOT NULL,
            gender TEXT NOT NULL,
            country TEXT NOT NULL,
            city TEXT NOT NULL,
            earnings INTEGER NOT NULL,
            password TEXT NOT NULL
        )`;

        return this.dao.run(sql);
    }

    createEducationTable(){
        const sql = `CREATE TABLE IF NOT EXISTS contributorseducation(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contributor_id TEXT NOT NULL,
            school TEXT NOT NULL,
            degree TEXT NOT NULL,
            field TEXT NOT NULL,
            startdate TEXT NOT NULL,
            enddate TEXT NOT NULL,
            grade TEXT NOT NULL,
            description TEXT NOT NULL,
            media_url,
        )`;

        return this.dao.run(sql);
    }

    createWorkExperienceTable(){
        const sql = `CREATE TABLE IF NOT EXISTS contributorsworkexperience(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contributor_id TEXT NOT NULL,
            title TEXT NOT NULL,
            employment_type TEXT NOT NULL,
            company_name TEXT NOT NULL,
            location TEXT NOT NULL,
            industry TEXT NOT NULL,
            startdate TEXT NOT NULL,
            description TEXT NOT NULL,
            media_url,
        )`;

        return this.dao.run(sql);
    }

    registerContributor(contributor_id, firstname, lastname, email, username, profile_pic = "", age, gender, country = "", city = "", earnings = 0, password){
        const sql = `INSERT INTO contributors (contributor_id, firstname, lastname, email, username, profile_pic, age, gender, country, city, earnings, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [contributor_id, firstname, lastname, email, username, profile_pic, age, gender, country, city, earnings, password]

        return this.dao.run(sql, params);
    }

    registerContributorEducation(contributor_id, school = "", degree = "", field = "", startdate = "", enddate = "", grade = "", description = "", media_url = ""){
        const sql = `INSERT INTO contributorseducation (contributor_id, school, degree, field, startdate, enddate, grade, description, media_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [contributor_id, school, degree, field, startdate, enddate, grade, description, media_url];
        
        return this.dao.run(sql, params);
    }

    registerContributorWorkExperience(contributor_id, title = "", employment_type = "", company_name = "", location = "", industry = "", startdate= "", description = "", media_url = ""){
        const sql = `INSERT INTO contributorsworkexperience (contributor_id, title, employment_type, company_name, location, industry, startdate, description, media_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [contributor_id, title, employment_type, company_name, location, industry, startdate, description, media_url];

        return this.dao.run(sql, params);
    }

    loginContributor(email){
        const sql = `SELECT * FROM contributors WHERE email = ?`;
        const params = [email];

        return this.dao.get(sql, params);
    }

    updateContributor(contributor_id, firstname, lastname, profile_pic = "", age = "", gender, country = "", city = "",){
        const sql = `UPDATE contributors SET firstname = ?, lastname = ?, profile_pic = ?, age = ?, gender = ?, country = ?, city = ? WHERE contributor_id = ?`;
        const params = [firstname, lastname, profile_pic, age, gender, country, city, contributor_id]

        return this.dao.run(sql, params);
    }

    updateContributorEarnings(contributor_id, earnings){
        const sql = `UPDATE contributors SET earnings = ? WHERE contributor_id = ?`;
        const params = [earnings, contributor_id]

        return this.dao.run(sql, params);
    }

    showAllContributors(){
        const sql = `SELECT * FROM contributors`;
        return this.dao.all(sql);
    }
}

module.exports = ContributorsAccount;