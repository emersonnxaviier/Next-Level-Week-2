import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

// usado para definir o formato dos horarios de aula.
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {


    // LISTA TODAS AS AULAS
    async index(request: Request, response: Response) {

        try {

            const filters = request.query;

            const week_day = filters.week_day as string;
            const subject = filters.subject as string;
            const time = filters.time as string;

            // FILTAR DIA DA SEMANA, MATERIA E HORARIO.
            if (!filters.week_day || !filters.subject || !filters.time) {
                return response.status(400).json({ error: 'Faltando filtros para pesquisar aulas' });
            }

            //converte hora passada para minutos, para fazer a busca no banco de dados que também está em minutos.
            const timeInMinutes = convertHourToMinutes(time);

            const classes = await db('classes')
                .whereExists(function () {
                    this.select('class_schedule.*')
                        .from('class_schedule')
                        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                })
                .where('classes.subject', '=', subject) // ex: classes.subject é igual a tabela.coluna
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*']);

            return response.json(classes);

        } catch (error) {
            return response.status(500).json({ error });
        }

    }

    // CRIA UMA NOVA AULA
    async create(request: Request, response: Response) {

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const trx = await db.transaction();

        try {
            /* #1.1 injeta os valores na tabela users, e como o id foi definido como auto increment na migration, cria uma 
                    constante para armazenar e retornar o valor dos IDs dos usuários inseridos, nesse caso a constante 'insertedUsersIds'.
            */
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
            const user_id = insertedUsersIds[0]; // sendo a posição zero o id do usuário.


            // #1.2 cadastro de materias com custo da hora e identificação do professor.
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });
            const class_id = insertedClassesIds[0]; // sendo a posição zero o id do usuário.


            // #1.3  horario de aula, com o formato de data e hora que o banco de dados espera.
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                };

            });

            // cadastro do horario de aulas 
            await trx('class_schedule').insert(classSchedule);
            // somente aqui todos os dados serão cadastrados no banco de dados.
            await trx.commit();

            return response.status(201).send(); //retorna o status de criado com sucesso.
        }

        catch (error) {

            await trx.rollback(); // como está sendo utilizado o trx, é bom utilizar o rollback por que caso aconteça algum erro ele vai desfazer tudo.
            return response.status(400).json({ error: 'Erro inesperado ao criar nova classe' })
        }
    }

}