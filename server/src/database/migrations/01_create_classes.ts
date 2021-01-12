import Knex from 'knex';

// ALTERAÇÕES QUE DESEJA REALIZAR NO BANCO DE DADOS.
export async function up(knex: Knex) {

    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.string('cost').notNullable();

        // CRIA UM RELACIONAMENTO PARA IDENTIFICAR QUAL USUÁRIO CRIOU A AULA.
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')  // SE O ID DO USUÁRIO NA TABELA USERS FOR ALTERADO, AQUI TAMBÉM SERÁ ALTERADO SEM PROBLEMAS E DE FORMA AUTOMATICA.
            .onDelete('CASCADE'); // SE O USUÁRIO FOR DELETADO DA PLATAFORMA, SUAS AULAS TAMBÉM SERÃO APAGADAS DE FORMA AUTOMATICA.
    });

}

// DESFAZER AS ALTERAÇÕES FEITAS NO BANCO DE DADOS.
export async function down(knex: Knex) {

    return knex.schema.dropTable('classes');
}