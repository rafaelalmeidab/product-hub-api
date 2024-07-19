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
exports.updateProductCategory = exports.updateProduct = exports.findProductByTitle = exports.findProductById = exports.findAllProducts = exports.deleteProduct = exports.addProduct = void 0;
const dbService_1 = __importDefault(require("./dbService"));
function addProduct(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        const category_id = productData.category_id !== undefined ? productData.category_id : null;
        const sql = "INSERT INTO products (title, description, price, category_id, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [productData.title, productData.description, productData.price, category_id, global.loggedInUserId];
        try {
            const { rows } = yield dbService_1.default.query(sql, values);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error adding product:', error);
            return null;
        }
    });
}
exports.addProduct = addProduct;
function deleteProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "DELETE FROM products WHERE id = $1 RETURNING *";
        try {
            const { rows } = yield dbService_1.default.query(sql, [productId]);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error deleting product:', error);
            return null;
        }
    });
}
exports.deleteProduct = deleteProduct;
function findAllProducts(categoryFlag = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NOT NULL";
        if (categoryFlag) {
            sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NULL";
        }
        try {
            const { rows } = yield dbService_1.default.query(sql);
            return rows;
        }
        catch (error) {
            console.error('Error finding all products:', error);
            return [];
        }
    });
}
exports.findAllProducts = findAllProducts;
function findProductById(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE id = $1";
        try {
            const { rows } = yield dbService_1.default.query(sql, [productId]);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error finding product by ID:', error);
            return null;
        }
    });
}
exports.findProductById = findProductById;
function findProductByTitle(productTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE title = $1";
        try {
            const { rows } = yield dbService_1.default.query(sql, [productTitle]);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error finding product by title:', error);
            return null;
        }
    });
}
exports.findProductByTitle = findProductByTitle;
function updateProduct(fields, values, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = $1 RETURNING *`;
        try {
            const { rows } = yield dbService_1.default.query(sql, [...values, id]);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error updating product:', error);
            return null;
        }
    });
}
exports.updateProduct = updateProduct;
function updateProductCategory(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "UPDATE products SET category_id = $1 WHERE id = $2 RETURNING *";
        const values = [productData.category_id, productData.id];
        try {
            const { rows } = yield dbService_1.default.query(sql, values);
            return rows[0] || null;
        }
        catch (error) {
            console.error('Error updating product category:', error);
            return null;
        }
    });
}
exports.updateProductCategory = updateProductCategory;
