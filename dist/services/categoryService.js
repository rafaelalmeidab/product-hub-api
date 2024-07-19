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
exports.updateCategory = exports.findCategoryByTitle = exports.findCategoryById = exports.findAllCategories = exports.deleteCategory = exports.addCategory = void 0;
const dbService_1 = __importDefault(require("./dbService"));
function addCategory(categoryData) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "INSERT INTO categories (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *";
        const values = [categoryData.title, categoryData.description, global.loggedInUserId];
        try {
            const { rows } = yield dbService_1.default.query(sql, values);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error adding category:', error);
            return null;
        }
    });
}
exports.addCategory = addCategory;
function deleteCategory(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "DELETE FROM categories WHERE id = $1 RETURNING *";
        try {
            const { rows } = yield dbService_1.default.query(sql, [categoryId]);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error deleting category:', error);
            return null;
        }
    });
}
exports.deleteCategory = deleteCategory;
function findAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, title, description, owner_id, created_at FROM categories";
        try {
            const { rows } = yield dbService_1.default.query(sql);
            return rows;
        }
        catch (error) {
            console.error('Error finding all categories:', error);
            return [];
        }
    });
}
exports.findAllCategories = findAllCategories;
function findCategoryById(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, title, description FROM categories WHERE id = $1";
        try {
            const { rows } = yield dbService_1.default.query(sql, [categoryId]);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error finding category by ID:', error);
            return null;
        }
    });
}
exports.findCategoryById = findCategoryById;
function findCategoryByTitle(categoryTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, title, description FROM categories WHERE title = $1";
        try {
            const { rows } = yield dbService_1.default.query(sql, [categoryTitle]);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error finding category by title:', error);
            return null;
        }
    });
}
exports.findCategoryByTitle = findCategoryByTitle;
function updateCategory(categoryData) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "UPDATE categories SET title = $1, description = $2, owner_id = $3 WHERE id = $4 RETURNING *";
        const values = [categoryData.title, categoryData.description, global.loggedInUserId, categoryData.id];
        try {
            const { rows } = yield dbService_1.default.query(sql, values);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error updating category:', error);
            return null;
        }
    });
}
exports.updateCategory = updateCategory;
