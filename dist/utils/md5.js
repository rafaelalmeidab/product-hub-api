"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.createMD5Hash = void 0;
const crypto_1 = __importDefault(require("crypto"));
function createMD5Hash(string) {
    const hash = crypto_1.default.createHash('md5');
    hash.update(string);
    return hash.digest('hex');
}
exports.createMD5Hash = createMD5Hash;
function comparePassword(normalString, md5String) {
    const md5NormalString = createMD5Hash(normalString);
    return md5NormalString === md5String;
}
exports.comparePassword = comparePassword;
