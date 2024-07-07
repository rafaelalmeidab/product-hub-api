const dotenv = require("dotenv");
const jwt    = require('jsonwebtoken');
const md5    = require('../../utils/md5.js');      

const { createUser, findAllUsers, findUserByEmail, findUserByUsername } = require('../../services/userService.js');

dotenv.config();
const SECRET = process.env.SECRET;

async function login(req){
    let user = req.body.username;
    var data = await findUserByUsername(user);
    
    
    if(data.length === 0){
        let response = {
            statusCode: 401,
            message: "Usuário não encontrado!",
            data:{
                username: user
            }
        };
        
        return response;
    }
    
    const validatePassword = md5.comparePassword(req.body.password, data[0].password);
    if(!validatePassword){
        var response = {
            statusCode: 401,
            message: "Usuário e/ou senha não encontrado(s)!"
        };
        
        return response;
    }
    
    const token = jwt.sign({user: req.body.user, idUser: data[0].id}, SECRET, {expiresIn:  "20m"});
    global.loggedInUserId = data[0].id;
    var response = {
        statusCode: 200,
        message: "Login realizado com sucesso!",
        body : {
            token: token
        }
    };
    
    return response;    
}

async function register(req){
    let user = req.body.username;
    var data = await findUserByUsername(user);

    if(data.length !== 0){
        let response = {
            statusCode: 401,
            message: "Nome de usuário se encontra em uso!",
            body:{
                username: user
            }
        };
    
        return response;
    }

    let email = req.body.email;
    var data = await findUserByEmail(email);

    if(data.length !== 0){
        var response = {
            statusCode: 401,
            message: "Email informado se encontra em uso!",
            body:{
                username: user
            }
        };
    
        return response;
    }

    const userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    var data = await createUser(userData);

    var response = {
        statusCode: 200,
        message: "Usuário criado com sucesso!",
        body : {
            username: req.body.username,
            email: req.body.email
        }
    };
    
    return response;    
}

module.exports = { login, register };