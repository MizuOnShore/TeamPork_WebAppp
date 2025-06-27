import config from './dbConfig.js';
import sql from 'mssql';

export const getUsers = async () => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query('SELECT * from Employee');
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
