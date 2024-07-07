import mysql from 'mysql2/promise';
import config from '../database/config/mysql';

async function query(sql: string, params?: any[]): Promise<any> {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

export default {
  query
};