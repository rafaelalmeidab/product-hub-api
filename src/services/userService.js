const db     = require('./dbService.js');
const helper = require('../helpers/helper.js');

async function createUser(userData){
  const sql = "INSERT INTO users (username, email, password) VALUES ('" + userData.username + "', '" + userData.email + "',md5(" + userData.password + "))";
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
    
  return data;
}

async function findAllUsers(){
  const sql = "SELECT id, username, password FROM users";
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
    
  return data;
}

async function findUserByEmail(email){
  const sql = "SELECT id, username, email FROM users WHERE email = '" + email + "'";
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function findUserByUsername(user){
  const sql = "SELECT id, username, password FROM users WHERE username = '" + user + "'";
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);

  return data;
}


module.exports = {
  createUser, findAllUsers, findUserByEmail, findUserByUsername
}