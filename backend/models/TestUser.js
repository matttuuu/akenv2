const pool = require('../db');

const getAllTestUsers = async () => {
  const result = await pool.query('SELECT * FROM test');
  return result.rows;
};


const createTestUser = async (dummyName,dummyAge) => {
  await pool.query('INSERT INTO test (username,age) VALUES ($1,$2)', [dummyName,dummyAge]);
};

module.exports = { getAllTestUsers, createTestUser };