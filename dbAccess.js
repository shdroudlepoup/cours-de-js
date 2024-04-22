import pg from 'pg';
const { Client } = pg;
export const clientDB = new Client({
  user: 'remig',
  database: 'remig',
  password: '0747',
});
clientDB.connect();