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
exports.category = category;
exports.erase = erase;
exports.list = list;
exports.list2 = list2;
exports.register = register;
exports.update = update;
const dotenv_1 = __importDefault(require("dotenv"));
const categoryService_1 = require("../../services/categoryService");
const productService_1 = require("../../services/productService");
dotenv_1.default.config();
const SECRET = process.env.SECRET;
function add(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const productData = req.body;
        const emptyFields = [];
        if (!productData.title) {
            emptyFields.push('title');
        }
        if (!productData.description) {
            emptyFields.push('description');
        }
        if (!productData.price) {
            emptyFields.push('price');
        }
        if (emptyFields.length > 0) {
            let response = {
                statusCode: 401,
                message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(', ')}`
            };
            return response;
        }
        let title = req.body.title;
        let data = yield (0, productService_1.findProductByTitle)(title);
        if (data.length !== 0) {
            let response = {
                statusCode: 401,
                message: 'Produto já cadastrado no banco!',
                data: {
                    id: data[0].id,
                    title: data[0].title,
                    description: data[0].description
                }
            };
            return response;
        }
        data = yield (0, productService_1.addProduct)(productData);
        data = data[0];
        let response = {
            statusCode: 200,
            message: 'Produto adicionado com sucesso!',
            body: {
                title: data.title,
                description: data.description,
                price: data.price,
                category_id: data.category_id,
                owner_id: data.owner_id
            }
        };
        return response;
    });
}
function category(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const productData = req.body;
        const emptyFields = [];
        if (!productData.id) {
            emptyFields.push('id');
        }
        if (!productData.category_id) {
            emptyFields.push('category_id');
        }
        if (emptyFields.length > 0) {
            let response = {
                statusCode: 401,
                message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(', ')}`
            };
            return response;
        }
        let id = req.body.id;
        let data = yield (0, productService_1.findProductById)(id);
        if (data.length == 0) {
            let response = {
                statusCode: 401,
                message: 'Produto inexistente.',
                data: {
                    id: req.body.id
                }
            };
            return response;
        }
        if (data[0].category_id) {
            let response = {
                statusCode: 401,
                message: 'Produto com categoria cadastrada.',
                data: {
                    id: data[0].id,
                    title: data[0].title,
                    description: data[0].description,
                    category_id: data[0].category_id
                }
            };
            return response;
        }
        let category_id = req.body.category_id;
        data = yield (0, categoryService_1.findCategoryById)(category_id);
        if (data.length === 0) {
            let response = {
                statusCode: 401,
                message: 'Categoria inexistente!',
                data: {
                    category_id: category_id
                }
            };
            return response;
        }
        data = yield (0, productService_1.updateProductCategory)(productData);
        data = data[0];
        let response = {
            statusCode: 200,
            message: 'Categoria associada a produto com sucesso!',
            body: {
                title: data.title,
                description: data.description,
                price: data.price,
                category_id: data.category_id,
                owner_id: data.owner_id
            }
        };
        return response;
    });
}
function erase(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.body.id;
        let data = yield (0, productService_1.findProductById)(id);
        if (data.length === 0) {
            let response = {
                statusCode: 401,
                message: 'Produto inexistente!',
                data: {
                    product: id
                }
            };
            return response;
        }
        let dataProduct = data[0];
        data = yield (0, productService_1.deleteProduct)(id);
        let response = {
            statusCode: 200,
            message: 'Produto excluído com sucesso!',
            body: {
                product: dataProduct.id,
                title: dataProduct.title,
                description: dataProduct.description,
                price: dataProduct.price,
                category_id: dataProduct.category_id,
                owner: dataProduct.owner
            }
        };
        return response;
    });
}
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (0, productService_1.findAllProducts)();
        if (data.length === 0) {
            let response = {
                statusCode: 401,
                message: 'Não existem produtos cadastrados!'
            };
            return response;
        }
        let response = {
            statusCode: 200,
            message: 'Lista de produtos.',
            body: {
                data: data
            }
        };
        return response;
    });
}
function list2() {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield (0, productService_1.findAllProducts)(true);
        if (data.length === 0) {
            let response = {
                statusCode: 401,
                message: 'Não existem produtos sem categoria cadastrados!'
            };
            return response;
        }
        let response = {
            statusCode: 200,
            message: 'Lista de produtos sem categoria.',
            body: {
                data: data
            }
        };
        return response;
    });
}
function register(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = req.body.username;
        let data = yield findUserByUsername(user);
        if (data.length !== 0) {
            let response = {
                statusCode: 401,
                message: 'Nome de usuário se encontra em uso!',
                data: {
                    username: user
                }
            };
            return response;
        }
        let email = req.body.email;
        data = yield findUserByUsername(user);
        if (data.length !== 0) {
            let response = {
                statusCode: 401,
                message: 'Email informado se encontra em uso!',
                data: {
                    username: user
                }
            };
            return response;
        }
        const userData = {
            username: req.body.username,
            password: req.body.password
        };
        data = yield createUser(userData);
        let response = {
            statusCode: 200,
            body: {
                message: 'Usuário criado com sucesso!',
                username: req.body.username
            }
        };
        return response;
    });
}
function update(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const productData = req.body;
        const emptyFields = [];
        if (!productData.id) {
            emptyFields.push('id');
        }
        if (emptyFields.length > 0) {
            let response = {
                statusCode: 401,
                message: `Os seguintes campos devem ser preenchidos: ${emptyFields.join(', ')}`
            };
            return response;
        }
        let id = req.body.id;
        let data = yield (0, productService_1.findProductById)(id);
        if (data.length === 0) {
            let response = {
                statusCode: 401,
                message: 'Produto inexistente.',
                data: {
                    id: req.body.id
                }
            };
            return response;
        }
        productData.id = data[0].id;
        const fields = [];
        const values = [];
        if (productData.title !== undefined && productData.title !== '') {
            fields.push('title = ?');
            values.push(productData.title);
        }
        if (productData.description !== undefined && productData.description !== '') {
            fields.push('description = ?');
            values.push(productData.description);
        }
        if (productData.price !== undefined && productData.price !== '') {
            fields.push('price = ?');
            values.push(productData.price);
        }
        if (productData.category_id !== undefined && productData.category_id !== '') {
            fields.push('category_id = ?');
            values.push(productData.category_id);
        }
        fields.push('owner_id = ?');
        values.push(global.loggedInUserId);
        fields.push('updated_at = CURRENT_TIMESTAMP');
        values.push(productData.id);
        data = yield (0, productService_1.updateProduct)(fields, values, productData.id);
        data = data[0];
        let response = {
            statusCode: 200,
            message: 'Produto atualizado com sucesso!',
            body: {
                id: data.id,
                title: data.title,
                description: data.description,
                price: data.price,
                category_id: data.category_id
            }
        };
        return response;
    });
}
