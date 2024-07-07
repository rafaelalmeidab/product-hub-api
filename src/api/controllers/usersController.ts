import dotenv from 'dotenv';
import { findAllUsers } from '../../services/userService';

dotenv.config();

async function users() {
  const data = await findAllUsers();
  
  return data;
}

export { users };