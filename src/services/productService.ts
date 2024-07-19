import db from './dbService';
import { QueryResult } from 'pg';

interface ProductData {
  id?: number;
  title: string;
  description: string;
  price: number;
  category_id?: number;
}

async function addProduct(productData: ProductData): Promise<ProductData | null> {
  const category_id = productData.category_id !== undefined ? productData.category_id : null;
  const sql = "INSERT INTO products (title, description, price, category_id, owner_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [productData.title, productData.description, productData.price, category_id, global.loggedInUserId];
  try {
    const { rows }: QueryResult = await db.query(sql, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
}

async function deleteProduct(productId: number): Promise<ProductData | null> {
  const sql = "DELETE FROM products WHERE id = $1 RETURNING *";
  try {
    const { rows }: QueryResult = await db.query(sql, [productId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error deleting product:', error);
    return null;
  }
}

async function findAllProducts(categoryFlag: boolean | null = null): Promise<ProductData[]> {
  let sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NOT NULL";
  if (categoryFlag) {
    sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE category_id IS NULL";
  }
  try {
    const { rows }: QueryResult = await db.query(sql);
    return rows;
  } catch (error) {
    console.error('Error finding all products:', error);
    return [];
  }
}

async function findProductById(productId: number): Promise<ProductData | null> {
  const sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE id = $1";
  try {
    const { rows }: QueryResult = await db.query(sql, [productId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding product by ID:', error);
    return null;
  }
}

async function findProductByTitle(productTitle: string): Promise<ProductData | null> {
  const sql = "SELECT id, title, description, price, category_id, owner_id, created_at, updated_at FROM products WHERE title = $1";
  try {
    const { rows }: QueryResult = await db.query(sql, [productTitle]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding product by title:', error);
    return null;
  }
}

async function updateProduct(fields: string[], values: any[], id: number): Promise<ProductData | null> {
  const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = $1 RETURNING *`;
  try {
    const { rows }: QueryResult = await db.query(sql, [...values, id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

async function updateProductCategory(productData: ProductData): Promise<ProductData | null> {
  const sql = "UPDATE products SET category_id = $1 WHERE id = $2 RETURNING *";
  const values = [productData.category_id, productData.id];
  try {
    const { rows }: QueryResult = await db.query(sql, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error updating product category:', error);
    return null;
  }
}

export {
  addProduct,
  deleteProduct,
  findAllProducts,
  findProductById,
  findProductByTitle,
  updateProduct,
  updateProductCategory
};
