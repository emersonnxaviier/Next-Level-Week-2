/*
    #1 ALTERAÇÕES QUE DESEJA REALIZAR NO BANCO DE DADOS.
    #1.1  quando o usuário clicar em entar em contato, vai buscar o id do professor que deseja entrar em contato,
        e a hora que isso aconteceu.
    #2 DESFAZER AS ALTERAÇÕES FEITAS NO BANCO DE DADOS.

*/

import Knex from 'knex';

// #1 
export async function up(knex: Knex) {

    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        // #1.1
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.timestamp('create_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP')) // ACESSA A HORA ATUAL DA MAQUINA NO SQLITE. 
            .notNullable();
    });

}

// #2 
export async function down(knex: Knex) {
    return knex.schema.dropTable('connections');
}