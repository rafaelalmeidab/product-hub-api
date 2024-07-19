import db from './dbService';
import helper from '../helpers/helper';

interface UserData {
  id?: number;
  username: string;
  email?: string;
  password: string;
}

async function createUser(userData: UserData): Promise<UserData | null> {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, md5(?)) RETURNING *";
  const values = [userData.username, userData.email, userData.password];
  try {
    const { rows } = await db.query(sql, values);
    return rows[0] || null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

async function findAllUsers(): Promise<UserData[]> {
  const sql = "SELECT id, username, password FROM users";
  try {
    const { rows } = await db.query(sql);
    return rows;
  } catch (error) {
    console.error('Error finding all users:', error);
    return [];
  }
}

async function findUserByEmail(email: string): Promise<UserData | null> {
  const sql = "SELECT id, username, email FROM users WHERE email = ?";
  try {
    const { rows } = await db.query(sql, [email]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

async function findUserByUsername(username: string): Promise<UserData | null> {
  const sql = "SELECT id, username, password FROM users WHERE username = ?";
  try {
    const { rows } = await db.query(sql, [username]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding user by username:', error);
    return null;
  }
}

export {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserByUsername
};
