const { v4: uuidv4 } = require('uuid');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('ratings', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.uuid('list_id').notNullable().references('id').inTable('movielists').onDelete('CASCADE');
        table.string('movie_id').notNullable();
        table.boolean('love').notNullable();
        table.boolean('love_to_hate').notNullable();
        table.boolean('rewatch').notNullable();
        table.boolean('like').notNullable();
        table.boolean('would_recommend').notNullable();
        table.boolean('would_not_recommend').notNullable();
        table.boolean('dislike').notNullable();
        table.boolean('meh').notNullable();
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
