import db from './dbService';
import { QueryResult } from 'pg';

interface Category {
  id: number;
  title: string;
  description: string;
  owner_id?: number;
}

async function addCategory(categoryData: Category): Promise<Category | null> {
  const sql = "INSERT INTO categories (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *";
  const values = [categoryData.title, categoryData.description, global.loggedInUserId];
  try {
    const { rows }: QueryResult = await db.query(sql, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error adding category:', error);
    return null;
  }
}

async function deleteCategory(categoryId: number): Promise<Category | null> {
  const sql = "DELETE FROM categories WHERE id = $1 RETURNING *";
  try {
    const { rows }: QueryResult = await db.query(sql, [categoryId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error deleting category:', error);
    return null;
  }
}

async function findAllCategories(): Promise<Category[]> {
  const sql = "SELECT id, title, description, owner_id, created_at FROM categories";
  try {
    const { rows }: QueryResult = await db.query(sql);
    return rows;
  } catch (error) {
    console.error('Error finding all categories:', error);
    return [];
  }
}

async function findCategoryById(categoryId: number): Promise<Category | null> {
  const sql = "SELECT id, title, description FROM categories WHERE id = $1";
  try {
    const { rows }: QueryResult = await db.query(sql, [categoryId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding category by ID:', error);
    return null;
  }
}

async function findCategoryByTitle(categoryTitle: string): Promise<Category | null> {
  const sql = "SELECT id, title, description FROM categories WHERE title = $1";
  try {
    const { rows }: QueryResult = await db.query(sql, [categoryTitle]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding category by title:', error);
    return null;
  }
}

async function updateCategory(categoryData: Category): Promise<Category | null> {
  const sql = "UPDATE categories SET title = $1, description = $2, owner_id = $3 WHERE id = $4 RETURNING *";
  const values = [categoryData.title, categoryData.description, global.loggedInUserId, categoryData.id];
  try {
    const { rows }: QueryResult = await db.query(sql, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error updating category:', error);
    return null;
  }
}

export {
  addCategory,
  deleteCategory,
  findAllCategories,
  findCategoryById,
  findCategoryByTitle,
  updateCategory
};
