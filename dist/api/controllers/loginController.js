"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const md5 = __importStar(require("../../utils/md5"));
const userService_1 = require("../../services/userService");
dotenv_1.default.config();
const SECRET = process.env.SECRET;
function login(req) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let user = req.body.username;
        const data = yield (0, userService_1.findUserByUsername)(user);
        if (data === null) {
            let response = {
                statusCode: 401,
                message: "Usuário não encontrado!",
                data: {
                    username: user
                }
            };
            return response;
        }
        const validatePassword = md5.comparePassword(req.body.password, data.password);
        if (!validatePassword) {
            let response = {
                statusCode: 401,
                message: "Usuário e/ou senha não encontrado(s)!"
            };
            return response;
        }
        const token = jsonwebtoken_1.default.sign({ user: req.body.user, idUser: data.id }, SECRET, { expiresIn: "20m" });
        global.loggedInUserId = (_a = data.id) !== null && _a !== void 0 ? _a : null;
        let response = {
            statusCode: 200,
            message: "Login realizado com sucesso!",
            body: {
                token: token
            }
        };
        return response;
    });
}
exports.login = login;
function register(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = req.body.username;
        let data = yield (0, userService_1.findUserByUsername)(user);
        if (data !== null) {
            let response = {
                statusCode: 401,
                message: "Nome de usuário se encontra em uso!",
                body: {
                    username: user
                }
            };
            return response;
        }
        let email = req.body.email;
        data = yield (0, userService_1.findUserByEmail)(email);
        if (data !== null) {
            let response = {
                statusCode: 401,
                message: "Email informado se encontra em uso!",
                body: {
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
        data = yield (0, userService_1.createUser)(userData);
        let response = {
            statusCode: 200,
            message: "Usuário criado com sucesso!",
            body: {
                username: req.body.username,
                email: req.body.email
            }
        };
        return response;
    });
}
exports.register = register;
