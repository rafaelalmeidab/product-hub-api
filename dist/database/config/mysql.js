"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dasadb',
        port: 3306,
        connectionLimit: 10,
        connectTimeout: 60000
    },
    listPerPage: 10,
};
exports.default = config;
