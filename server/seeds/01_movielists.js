/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movielists').del()
  await knex('movielists').insert([
    {
      id: 1,
      user_id: 1,
      list_title: "Sidney Poitier",
      created_at: "2024-05-05 12:34:56",
      updated_at: null,
    },
    {
      id: 2, 
      user_id: 1,
      list_title: "classics",
      created_at: "2024-05-10 1:34:56",
      updated_at: null,
    },
    {
      id: 3, 
      user_id: 1,
      list_title: "Highschool Favs",
      created_at: "2024-05-12 1:34:56",
      updated_at: null,
    },
    
  ]);
};
