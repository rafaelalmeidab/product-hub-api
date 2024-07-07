const express = require("express");
const router  = express.Router();

const categoryController = require('../controllers/categoryController');
const loginController    = require('../controllers/loginController');
const productController  = require('../controllers/productController');
const loginAuth          = require('../middlewares/loginAuth.js');

// Unauthenticated Routes
router.post('/login', async (req, res, next) => {
  try {
    const ans = await loginController.login(req);
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while logging users', err.message);
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const ans = await loginController.register(req);
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while registering users', err.message);
    next(err);
  }
});

// Authenticated Routes
// Category
router.get('/category/list', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await categoryController.list();
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while listing categories', err.message);
    next(err);
  }
});

router.delete('/category/erase', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await categoryController.erase(req);
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while deleting categories', err.message);
    next(err);
  }
});

router.post('/category/add', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await categoryController.add(req);
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while adding categories', err.message);
    next(err);
  }
});

router.put('/category/put', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await categoryController.update(req);
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while putting categories', err.message);
    next(err);
  }
});

// Product
router.get('/product/list', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await productController.list();
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while listing products', err.message);
    next(err);
  }
});

router.get('/product/list/none-category', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await productController.list2();
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while listing products', err.message);
    next(err);
  }
});

router.delete('/product/erase', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await productController.erase(req);
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while deleting products', err.message);
    next(err);
  }
});

router.post('/product/add', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await productController.add(req);
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while adding products', err.message);
    next(err);
  }
});

router.put('/product/put', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await productController.update(req);
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while putting products', err.message);
    next(err);
  }
});

router.put('/product/category', loginAuth.auth, async (req, res, next) => {
  try {
    const ans = await productController.category(req);
    res.status(ans.statusCode).send(ans);
  } catch (err) {
    console.error('Error while putting products', err.message);
    next(err);
  }
});

module.exports = router;