const mysql = require('mysql');
const dbconfig = require('../../config/db_config');

// CREATE RAW CONNECTION WHICH CAN BE QUERIED. AVOID USING ME! PROBABLY SHOULDN'T BE EXPOSED TO CLIENT CODE
function connection() {
    return mysql.createConnection(dbconfig)
}

// RETURN JSON RESULT OF A QUERY
function query(queryString /*string*/) {
    return new Promise((resolve, reject) => {
        connection().query(queryString, (error, results, fields) => {
            if (error) {
                reject (error);
            }

            resolve (results);
        })
    })
}

// GET A SINGLE USER
function getUser(email /*string*/) {
    return new Promise((resolve, reject) => {
        connection().query(`SELECT * FROM users WHERE users.email = '${email}' LIMIT 1`, (error, results, fields) => {
            if (error) {
                reject (error);
            }

            if (results) {
                resolve(results[0]);
            }
            else {
                resolve(false);
            }
        })
    })
}

// GET ALL USERS
function getAllUsers() {
    return new Promise( (resolve, reject) => {
        connection().query(`SELECT * FROM users`, (error, results, fields) => {
            if (error) {
                reject (error);
            }

            resolve(results);
        })
    })
}

// CREATE A SINGLE USER
function createUser(user /*user object*/) {
    return new Promise((resolve, reject) => {
        connection().query(`INSERT INTO users (email, hash, role, firstname, lastname)
        VALUES ('${user.email}', '${user.hash}', '${user.role}', '${user.firstname}', '${user.lastname}')`,
        (error, results, fields) => {
            if (error) {
                reject (error);
            }

            resolve(results);
        })
    })
}

module.exports =  {
    query,
    getUser,
    createUser,
    getAllUsers
}