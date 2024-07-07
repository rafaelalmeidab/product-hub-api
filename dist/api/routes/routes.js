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
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const productController_1 = __importDefault(require("../controllers/productController"));
const loginAuth_1 = __importDefault(require("../middlewares/loginAuth"));
const router = express_1.default.Router();
// Unauthenticated Routes
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield loginController_1.default.login(req);
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while logging users', err.message);
        next(err);
    }
}));
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield loginController_1.default.register(req);
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while registering users', err.message);
        next(err);
    }
}));
// Authenticated Routes
// Category
router.get('/category/list', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield categoryController_1.default.list();
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while listing categories', err.message);
        next(err);
    }
}));
router.delete('/category/erase', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield categoryController_1.default.erase(req);
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while deleting categories', err.message);
        next(err);
    }
}));
router.post('/category/add', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield categoryController_1.default.add(req);
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while adding categories', err.message);
        next(err);
    }
}));
router.put('/category/put', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield categoryController_1.default.update(req);
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while putting categories', err.message);
        next(err);
    }
}));
// Product
router.get('/product/list', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield productController_1.default.list();
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while listing products', err.message);
        next(err);
    }
}));
router.get('/product/list/none-category', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield productController_1.default.list2();
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while listing products', err.message);
        next(err);
    }
}));
router.delete('/product/erase', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield productController_1.default.erase(req);
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while deleting products', err.message);
        next(err);
    }
}));
router.post('/product/add', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield productController_1.default.add(req);
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while adding products', err.message);
        next(err);
    }
}));
router.put('/product/put', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield productController_1.default.update(req);
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while putting products', err.message);
        next(err);
    }
}));
router.put('/product/category', loginAuth_1.default.auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ans = yield productController_1.default.category(req);
        res.status(ans.statusCode).send(ans);
    }
    catch (err) {
        console.error('Error while putting products', err.message);
        next(err);
    }
}));
exports.default = router;
