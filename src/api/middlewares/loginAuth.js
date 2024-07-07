const jwt    = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config();
const SECRET = process.env.SECRET;

function auth(req, res, next){
    try{
        const token  = req.headers.authorization.split(' ')[1]; 
        const decode = jwt.verify(token, SECRET);
        req.user = decode;
        next();
    }
    catch(err){
        var response = {
            message: "Falha na autenticação."
        };
        
        return res.status(401).send(response);
    }
}

module.exports = { auth };