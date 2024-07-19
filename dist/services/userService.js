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
exports.findUserByUsername = exports.findUserByEmail = exports.findAllUsers = exports.createUser = void 0;
const dbService_1 = __importDefault(require("./dbService"));
function createUser(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, md5(?)) RETURNING *";
        const values = [userData.username, userData.email, userData.password];
        try {
            const { rows } = yield dbService_1.default.query(sql, values);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    });
}
exports.createUser = createUser;
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, username, password FROM users";
        try {
            const { rows } = yield dbService_1.default.query(sql);
            return rows;
        }
        catch (error) {
            console.error('Error finding all users:', error);
            return [];
        }
    });
}
exports.findAllUsers = findAllUsers;
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, username, email FROM users WHERE email = ?";
        try {
            const { rows } = yield dbService_1.default.query(sql, [email]);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error finding user by email:', error);
            return null;
        }
    });
}
exports.findUserByEmail = findUserByEmail;
function findUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, username, password FROM users WHERE username = ?";
        try {
            const { rows } = yield dbService_1.default.query(sql, [username]);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error finding user by username:', error);
            return null;
        }
    });
}
exports.findUserByUsername = findUserByUsername;
