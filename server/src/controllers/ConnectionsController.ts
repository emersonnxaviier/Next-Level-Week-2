import { Request, Response } from 'express';
import db from '../database/connection';


export default class ConnectionController {

    async index(request: Request, response: Response) {
        // vai fazer um calculo em todos os registros e transformar em uma coluna chamada total.
        const totalConnections = await db('connections').count('* as total');

        const { total } = totalConnections[0];
        return response.json({ total });
    }

    // cria uma conexão sempre que o usuário clicar em entrar em contato com o professor.
    async create(request: Request, response: Response) {

        const { user_id } = request.body;
        await db('connections').insert({
            user_id,
        });

        return response.status(201).send();
    }
}