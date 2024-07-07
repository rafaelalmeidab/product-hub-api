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
exports.add = add;
exports.erase = erase;
exports.list = list;
exports.update = update;
const dotenv_1 = __importDefault(require("dotenv"));
const categoryService_1 = require("../../services/categoryService");
dotenv_1.default.config();
const SECRET = process.env.SECRET;
function add(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryData = req.body;
        const emptyFields = [];
        if (!categoryData.title) {
            emptyFields.push("title");
        }
        if (!categoryData.description) {
            emptyFields.push("description");
        }
        if (emptyFields.length > 0) {
            let response = {
                statusCode: 401,
                message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(", ")}`
            };
            return response;
        }
        const title = req.body.title;
        const data = yield (0, categoryService_1.findCategoryByTitle)(title);
        if (data.length !== 0) {
            let response = {
                statusCode: 401,
                message: "Categoria já cadastrada no banco!",
                data: {
                    id: data[0].id,
                    title: data[0].title,
                    description: data[0].description
                }
            };
            return response;
        }
        const newData = yield (0, categoryService_1.addCategory)(categoryData);
        const response = {
            statusCode: 200,
            message: "Categoria adicionada com sucesso!",
            body: {
                title: categoryData.title,
                description: categoryData.description,
                owner_id: categoryData.owner_id
            }
        };
        return response;
    });
}
function erase(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.body.id;
        const data = yield (0, categoryService_1.findCategoryById)(id);
        if (data.length === 0) {
            let response = {
                statusCode: 401,
                message: "Categoria inexistente!",
                body: {
                    category: id
                }
            };
            return response;
        }
        const dataCategory = data[0];
        yield (0, categoryService_1.deleteCategory)(id);
        const response = {
            statusCode: 200,
            message: "Categoria excluída com sucesso!",
            body: {
                category: dataCategory.id,
                name: dataCategory.name,
                description: dataCategory.description
            }
        };
        return response;
    });
}
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, categoryService_1.findAllCategories)();
        if (data.length === 0) {
            let response = {
                statusCode: 401,
                message: "Não existem categorias cadastradas!"
            };
            return response;
        }
        const response = {
            statusCode: 200,
            message: "Lista de categorias.",
            body: {
                data: data
            }
        };
        return response;
    });
}
function update(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let productData = req.body;
        const emptyFields = [];
        if (!productData.id) {
            emptyFields.push("id");
        }
        if (!productData.title) {
            emptyFields.push("title");
        }
        if (!productData.description) {
            emptyFields.push("description");
        }
        if (emptyFields.length > 0) {
            let response = {
                statusCode: 401,
                message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(", ")}`
            };
            return response;
        }
        const id = req.body.id;
        const data = yield (0, categoryService_1.findCategoryById)(id);
        if (data.length === 0) {
            let response = {
                statusCode: 401,
                message: "Categoria inexistente.",
                data: {
                    id: req.body.id,
                    title: req.body.title,
                    description: req.body.description
                }
            };
            return response;
        }
        productData.id = data[0].id;
        const updatedData = yield (0, categoryService_1.updateCategory)(productData);
        const response = {
            statusCode: 200,
            message: "Categoria atualizada com sucesso!",
            body: {
                title: updatedData.title,
                description: updatedData.description,
                owner_id: updatedData.owner_id
            }
        };
        return response;
    });
}
