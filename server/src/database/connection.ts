import Knex from 'knex';
import Path from 'path';

const db = Knex({
    client: 'sqlite3',
    connection: {
        filename: Path.resolve(__dirname, 'database.sqlite')
    },

    // ESPECIFICA DO SQLITE
    useNullAsDefault: true,
});

export default db;