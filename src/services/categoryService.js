const db     = require('./dbService.js');
const helper = require('../helpers/helper.js');

async function addCategory(categoryData){
  const sql    = "INSERT INTO categories (title, description, owner_id) VALUES (?, ?, ?)";
  const values = [categoryData.title, categoryData.description, global.loggedInUserId];
  const rows   = await db.query(sql, values);
  const data   = helper.emptyOrRows(rows);
    
  return data;
}

async function deleteCategory(categoryId) {
  const sql  = "DELETE FROM categories WHERE id = ?";
  const rows = await db.query(sql, [categoryId]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function findAllCategories(){
  const sql  = "SELECT id, title, description, owner_id, created_at FROM categories";
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
    
  return data;
}

async function findCategoryById(categoryId){
  const sql  = "SELECT id, title, description FROM categories WHERE id = ?";
  const rows = await db.query(sql, [categoryId]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function findCategoryByTitle(categoryTitle){
  const sql  = "SELECT id, title, description FROM categories WHERE title = ?";
  const rows = await db.query(sql, [categoryTitle]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function updateCategory(categoryData){
  var sql = "UPDATE categories SET title = ?, description = ?, owner_id = ? WHERE id = ?";
  const values = [categoryData.title, categoryData.description, global.loggedInUserId, categoryData.id];
  const rows = await db.query(sql, values);
  const data = helper.emptyOrRows(rows);
  
  var ret = await findCategoryById(categoryData.id);
  return ret;
}

module.exports = {
  addCategory, deleteCategory, findAllCategories, findCategoryById, findCategoryByTitle, updateCategory
}