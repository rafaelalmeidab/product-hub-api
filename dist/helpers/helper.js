"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * listPerPage;
}
function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}
exports.default = {
    getOffset,
    emptyOrRows
};
