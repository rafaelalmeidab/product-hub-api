import db from './dbService';
import helper from '../helpers/helper';

interface ProductData {
  id?: number;
  title: string;
  description: string;
  price: number;
  category_id?: number;
}

async function addProduct(productData: ProductData): Promise<any> {
  const category_id = productData.category_id !== (undefined || '') ? productData.category_id : null;

  const sql = "INSERT INTO products (title, description, price, category_id, owner_id) VALUES (?, ?, ?, ?, ?)";
  const values = [productData.title, productData.description, productData.price, category_id, global.loggedInUserId];
  const rows = await db.query(sql, values);

  const insertId = rows.insertId;
  const insertedProduct = await findProductById(insertId);
  return insertedProduct;
}

async function deleteProduct(productId: number): Promise<any> {
  const sql = "DELETE FROM products WHERE id = ?";
  const rows = await db.query(sql, [productId]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function findAllProducts(categoryFlag: boolean | null = null): Promise<any> {
  let sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NOT NULL";
  if (categoryFlag) {
    sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NULL";
  }
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function findProductById(productId: number): Promise<any> {
  const sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE id = ?";
  const rows = await db.query(sql, [productId]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function findProductByTitle(productTitle: string): Promise<any> {
  const sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE title = ?";
  const rows = await db.query(sql, [productTitle]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function updateProduct(fields: string[], values: any[], id: number): Promise<any> {
  const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
  const rows = await db.query(sql, values);
  const data = helper.emptyOrRows(rows);

  const updatedProduct = await findProductById(id);
  return updatedProduct;
}

async function updateProductCategory(productData: ProductData): Promise<any> {
  const sql = "UPDATE products SET category_id = ? WHERE id = ?";
  const values = [productData.category_id, productData.id];
  const rows = await db.query(sql, values);
  const data = helper.emptyOrRows(rows);

  const updatedProduct = await findProductById(productData.id);
  return updatedProduct;
}

export default {
  addProduct,
  deleteProduct,
  findAllProducts,
  findProductById,
  findProductByTitle,
  updateProduct,
  updateProductCategory
};