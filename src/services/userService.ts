import db from './dbService';
import helper from '../helpers/helper';

interface UserData {
  id?: number;
  username: string;
  email?: string;
  password: string;
}

async function createUser(userData: UserData): Promise<any> {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, md5(?))";
  const values = [userData.username, userData.email, userData.password];
  const rows = await db.query(sql, values);
  const data = helper.emptyOrRows(rows);
    
  return data;
}

async function findAllUsers(): Promise<any> {
  const sql = "SELECT id, username, password FROM users";
  const rows = await db.query(sql);
  const data = helper.emptyOrRows(rows);
    
  return data;
}

async function findUserByEmail(email: string): Promise<any> {
  const sql = "SELECT id, username, email FROM users WHERE email = ?";
  const rows = await db.query(sql, [email]);
  const data = helper.emptyOrRows(rows);

  return data;
}

async function findUserByUsername(username: string): Promise<any> {
  const sql = "SELECT id, username, password FROM users WHERE username = ?";
  const rows = await db.query(sql, [username]);
  const data = helper.emptyOrRows(rows);

  return data;
}

export default {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserByUsername
};