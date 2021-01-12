import Knex from 'knex';

// ALTERAÇÕES QUE DESEJA REALIZAR NO BANCO DE DADOS.
export async function up(knex: Knex) {

    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });

}

// DESFAZER AS ALTERAÇÕES FEITAS NO BANCO DE DADOS.
export async function down(knex: Knex) {

    return knex.schema.dropTable('users');
}