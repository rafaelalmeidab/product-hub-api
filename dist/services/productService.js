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
function addProduct(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        const category_id = productData.category_id !== (undefined || '') ? productData.category_id : null;
        const sql = "INSERT INTO products (title, description, price, category_id, owner_id) VALUES (?, ?, ?, ?, ?)";
        const values = [productData.title, productData.description, productData.price, category_id, global.loggedInUserId];
        const rows = yield dbService_1.default.query(sql, values);
        const insertId = rows.insertId;
        const insertedProduct = yield findProductById(insertId);
        return insertedProduct;
    });
}
function deleteProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "DELETE FROM products WHERE id = ?";
        const rows = yield dbService_1.default.query(sql, [productId]);
        const data = helper_1.default.emptyOrRows(rows);
        return data;
    });
}
function findAllProducts() {
    return __awaiter(this, arguments, void 0, function* (categoryFlag = null) {
        let sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NOT NULL";
        if (categoryFlag) {
            sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NULL";
        }
        const rows = yield dbService_1.default.query(sql);
        const data = helper_1.default.emptyOrRows(rows);
        return data;
    });
}
function findProductById(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE id = ?";
        const rows = yield dbService_1.default.query(sql, [productId]);
        const data = helper_1.default.emptyOrRows(rows);
        return data;
    });
}
function findProductByTitle(productTitle) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE title = ?";
        const rows = yield dbService_1.default.query(sql, [productTitle]);
        const data = helper_1.default.emptyOrRows(rows);
        return data;
    });
}
function updateProduct(fields, values, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
        const rows = yield dbService_1.default.query(sql, values);
        const data = helper_1.default.emptyOrRows(rows);
        const updatedProduct = yield findProductById(id);
        return updatedProduct;
    });
}
function updateProductCategory(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "UPDATE products SET category_id = ? WHERE id = ?";
        const values = [productData.category_id, productData.id];
        const rows = yield dbService_1.default.query(sql, values);
        const data = helper_1.default.emptyOrRows(rows);
        const updatedProduct = yield findProductById(productData.id);
        return updatedProduct;
    });
}
exports.default = {
    addProduct,
    deleteProduct,
    findAllProducts,
    findProductById,
    findProductByTitle,
    updateProduct,
    updateProductCategory
};
