import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());           // usado para abrir aplicações com endereços diferentes dentro da nossa aplicação.
app.use(express.json());  //necessario para fazer uma conversão do request.body num objeto javascript.
app.use(routes);

app.listen(3333);