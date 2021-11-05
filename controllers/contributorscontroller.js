const SqliteConnector = require('../models/sqliteconnection');
const AccountsContributor = require('../models/contributors/account');
const conn = new SqliteConnector('./lifestyle');
const Account = new AccountsContributor(conn);
const { body,validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');

exports.Register = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var contributor_id = req.body.contributor_id
            var firstname = req.body.firstname
            var lastname = req.body.lastname
            var email = req.body.email
            var gender = req.body.gender
            var age = req.body.age
            var country = req.body.country
            var city = req.body.city
            var username = req.body.username
            var password = req.body.password
            var profile_pic = req.body.profile_pic   

            if ((contributor_id != null && contributor_id != "") && firstname != "" && lastname != "" && email != "" && username != "" && password != "") {
                const encryptedpassword = await bcrypt.hash(password, 10);

                console.log(encryptedpassword);

                Account.createContributorTable()
                .then(() => Account.registerContributor(contributor_id, firstname, lastname, email, username, profile_pic, age, gender, country, city, 0, encryptedpassword))
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
                res.json({"message": "false", "error": "Parameter Missing"})
            }
        }
        else{
            res.json({"message": "false", "error": "Input Error"})
        }
        
    } catch (error) {
        res.json({"message": "false", "error": error})
    }
}

exports.RegisterContributorEducation = function(req, res, next) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var contributor_id = req.body.contributor_id
            var school = req.body.school
            var degree = req.body.degree
            var field = req.body.field
            var startdate = req.body.startdate
            var enddate = req.body.enddate
            var grade = req.body.grade
            var description = req.body.description
            var media_url = req.body.media_url         

            if (contributor_id != null && contributor_id != "") {
                Account.createEducationTable()
                .then(() => Account.registerContributorEducation(contributor_id, school, degree, field, startdate, enddate, grade, description, media_url))
                .then((data) => {
                    if (data.data != undefined && data.data != null) {
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
                res.json({"message": "false", "error": "Parameter Missing"})
            }
        }
        else{
            res.json({"message": "false", "error": "Input Error"})
        }
        
    } catch (error) {
        res.json({"message": "false", "error": error})
    }
}

exports.RegisterContributorWorkExperience = function(req, res, next) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var contributor_id = req.body.contributor_id
            var title = req.body.title
            var employment_type = req.body.employment_type
            var company_name = req.body.company_name
            var location = req.body.location
            var industry = req.body.industry
            var startdate = req.body.startdate
            var enddate = req.body.enddate
            var description = req.body.description
            var media_url = req.body.media_url       

            if (contributor_id != null && contributor_id != "") {
                Account.createWorkExperienceTable()
                .then(() => Account.registerContributorWorkExperience(contributor_id, title, employment_type, company_name, location, industry, startdate, enddate, description, media_url))
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
                res.json({"message": "false", "error": "Parameter Missing"})
            }
        }
        else{
            res.json({"message": "false", "error": "Input Error"})
        }
        
    } catch (error) {
        res.json({"message": "false", "error": error})
    }
}

exports.Login = async function(req, res) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var email = req.query.email
            var password = req.query.password

            if ((email != null || email != "") && (password != null || password != "")) {
                Account.loginContributor(email)
                .then(async (data) => {
                    if (data.data == undefined || data.data == null) {
                        res.json({"message": "false", "error": "Not Found"})
                    }
                    else{
                        if (data.data.password) {
                            const check = await bcrypt.compare(password, data.data.password);
                            if (check) {
                                res.json({"message": "true", "data": data.data})
                            }
                            else{
                                res.json({"message": "false", "error": "Passwords Do not match"})
                            }
                        }
                        else{
                            res.json({"message": "false", "error": "Password Needed"});
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            }
            else{
                res.json({"message": "false", "error": "Check username and password"});
            }
            
        }
        else{
            res.json({"message": "false", "error": "Input Error"});
        }
    } catch (error) {
        res.json({"message": "false", "error": error});
        console.log(error)
    }
    
}

exports.UpdateContributor = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var contributor_id = req.body.contributor_id
            var firstname = req.body.firstname
            var lastname = req.body.lastname
            var gender = req.body.gender
            var age = req.body.age
            var country = req.body.country
            var city = req.body.city
            var profile_pic = req.body.profile_pic   

            if (contributor_id != null && contributor_id != "") {

                Account.createContributorTable()
                .then(() => Account.updateContributor(contributor_id, firstname, lastname, profile_pic, age, gender, country, city))
                .then((data) => {
                    if (data.data != undefined && data.data != null) {
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
                res.json({"message": "false", "error": "Parameter Missing"})
            }
        }
        else{
            res.json({"message": "false", "error": "Input Error"})
        }
        
    } catch (error) {
        res.json({"message": "false", "error": error})
    }
}

exports.UpdateContributorEducation = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var contributor_id = req.body.contributor_id
            var school = req.body.school
            var degree = req.body.degree
            var field = req.body.field
            var startdate = req.body.startdate
            var enddate = req.body.enddate
            var grade = req.body.grade
            var description = req.body.description
            var media_url = req.body.media_url  

            if (contributor_id != null && contributor_id != "") {

                Account.createContributorTable()
                .then(() => Account.updateContributorEducation(contributor_id, school, degree, field, startdate, enddate, grade, description, media_url))
                .then((data) => {
                    if (data.data != undefined && data.data != null) {
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
                res.json({"message": "false", "error": "Parameter Missing"})
            }
        }
        else{
            res.json({"message": "false", "error": "Input Error"})
        }
        
    } catch (error) {
        res.json({"message": "false", "error": error})
    }
}

exports.UpdateContributorWorkExperience = async function(req, res, next) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var contributor_id = req.body.contributor_id
            var title = req.body.title
            var employment_type = req.body.employment_type
            var company_name = req.body.company_name
            var location = req.body.location
            var industry = req.body.industry
            var startdate = req.body.startdate
            var description = req.body.description
            var media_url = req.body.media_url  

            if (contributor_id != null && contributor_id != "") {

                Account.createContributorTable()
                .then(() => Account.updateContributorExperience(contributor_id, title, employment_type, company_name, location, industry, startdate, enddate, description, media_url))
                .then((data) => {
                    if (data.data != undefined && data.data != null) {
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
                res.json({"message": "false", "error": "Parameter Missing"})
            }
        }
        else{
            res.json({"message": "false", "error": "Input Error"})
        }
        
    } catch (error) {
        res.json({"message": "false", "error": error})
    }
}

exports.UpdateContributorEarnings = function(req, res, next) {
    try {
        var errors = validationResult(req);
        if (errors.isEmpty) {
            var contributor_id = req.query.contributor_id
            var earnings = req.query.earnings 

            if (contributor_id != null && contributor_id != "") {
                Account.createContributorTable()
                .then(() => Account.updateContributorEarnings(contributor_id, earnings))
                .then((data) => {
                    if (data.data != undefined && data.data != null) {
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
                res.json({"message": "false", "error": "Parameter Missing"})
            }
        }
        else{
            res.json({"message": "false", "error": "Input Error"})
        }
        
    } catch (error) {
        res.json({"message": "false", "error": error})
    }
}

exports.AllContributors = function(req, res) {
    Account.showAllContributors()
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

