"use strict";
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
const dbService_1 = __importDefault(require("./dbService"));
const helper_1 = __importDefault(require("../helpers/helper"));
function createUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, md5(?))";
        const values = [userData.username, userData.email, userData.password];
        const rows = yield dbService_1.default.query(sql, values);
        const data = helper_1.default.emptyOrRows(rows);
        return data;
    });
}
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, username, password FROM users";
        const rows = yield dbService_1.default.query(sql);
        const data = helper_1.default.emptyOrRows(rows);
        return data;
    });
}
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, username, email FROM users WHERE email = ?";
        const rows = yield dbService_1.default.query(sql, [email]);
        const data = helper_1.default.emptyOrRows(rows);
        return data;
    });
}
function findUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, username, password FROM users WHERE username = ?";
        const rows = yield dbService_1.default.query(sql, [username]);
        const data = helper_1.default.emptyOrRows(rows);
        return data;
    });
}
exports.default = {
    createUser,
    findAllUsers,
    findUserByEmail,
    findUserByUsername
};
