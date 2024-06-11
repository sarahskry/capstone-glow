const bcrypt = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      name: "brad",
      email: "bpitt@gmail.com",
      username: "bradley",
      password: bcrypt.hashSync('some-password')
    }
  ]);
};
