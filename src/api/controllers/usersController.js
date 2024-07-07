const dotenv = require("dotenv");
const { findAllUsers } = require('../../services/userService.js');

dotenv.config();

async function users(){
    const data = findAllUsers();
    
    return data;
}

module.exports = { users };