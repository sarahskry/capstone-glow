/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ratings').del()
  await knex('ratings').insert([
    {
      user_id: 1,
      list_id: 1,
      movie_id: 10633, //in the heat of the night
      love: true,
      love_to_hate: false,
      rewatch: true,
      like: false,
      would_recommend: true,
      would_not_recommend: false,
      dislike: false,
      meh: false,
      created_at: "2024-05-05 12:34:56",
      updated_at: null,
    },
    {
      user_id: 1,
      list_id: 2,
      movie_id: 164,//breakfast at tiffany's
      love: true,
      love_to_hate: false,
      rewatch: true,
      like: false,
      would_recommend: true,
      would_not_recommend: false,
      dislike: false,
      meh: false,
      created_at: "2024-05-10 1:34:56",
      updated_at: null,
    },
    {
      user_id: 1,
      list_id: 3,
      movie_id: 11457,//life as a house
      love: false,
      love_to_hate: false,
      rewatch: true,
      like: true,
      would_recommend: true,
      would_not_recommend: false,
      dislike: false,
      meh: false,
      created_at: "2024-05-12 1:34:56",
      updated_at: null,
    },


  ]);
};
