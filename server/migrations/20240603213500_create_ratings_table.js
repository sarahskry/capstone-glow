/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('ratings', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.integer('list_id').notNullable().unsigned().references('id').inTable('movielists').onDelete('CASCADE');
        table.string('movie_id').notNullable();
        table.boolean('love');
        table.boolean('love_to_hate');
        table.boolean('rewatch');
        table.boolean('like');
        table.boolean('would_recommend');
        table.boolean('would_not_recommend');
        table.boolean('dislike');
        table.boolean('meh');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('ratings');
};
