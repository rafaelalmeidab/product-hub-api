"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET;
function auth(req, res, next) {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from Authorization header
        if (!token) {
            throw new Error('Token não fornecido');
        }
        const decode = jsonwebtoken_1.default.verify(token, SECRET);
        req.user = decode;
        next();
    }
    catch (err) {
        let response = {
            message: 'Falha na autenticação.'
        };
        return res.status(401).send(response);
    }
}
