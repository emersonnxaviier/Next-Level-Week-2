import Knex from 'knex';

// ALTERAÇÕES QUE DESEJA REALIZAR NO BANCO DE DADOS.
export async function up(knex: Knex) {

    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        // CRIA UM RELACIONAMENTO PARA IDENTIFICAR QUAL AULA CRIADA SE RELACIONA COM QUAL CRONOGRAMA.
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')  // SE O ID DA AULA NA TABELA CLASSES FOR ALTERADO, AQUI TAMBÉM SERÁ ALTERADO SEM PROBLEMAS E DE FORMA AUTOMATICA.
            .onDelete('CASCADE'); // SE A AULA FOR DELETADO DA PLATAFORMA, SEU CRONOGRAMA TAMBÉM SERÁ APAGADA DE FORMA AUTOMATICA.
    });

}

// DESFAZER AS ALTERAÇÕES FEITAS NO BANCO DE DADOS.
export async function down(knex: Knex) {

    return knex.schema.dropTable('class_schedule');
}