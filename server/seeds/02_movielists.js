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
      list_title: "Watched",
    },
    {
      id: 2,
      user_id: 1,
      list_title: "Sidney Poitier",
    },
    {
      id: 3, 
      user_id: 1,
      list_title: "Classics",
    },
    {
      id: 4, 
      user_id: 1,
      list_title: "Highschool Favs",
    },
    
  ]);
};
