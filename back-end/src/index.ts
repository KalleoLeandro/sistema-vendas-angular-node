import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import routes from './routes/rotas';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger/swagger';

dotenv.config();

const server = express();

server.use(express.json());

server.use(cors());

//Declaração de cors
server.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}));

//Public folder
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended:true}));


//swagger
//const specs = swaggerJsdoc(swaggerOptions);

const swaggerDocument = require('./swagger/swagger-output.json'); // Carregue o arquivo JSON do swagger

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
        validatorUrl: null // Se quiser desabilitar a validação, caso contrário, forneça uma URL de validação
    }
}));

//Routes
server.use(routes);


//Default Route
server.use((req:Request, res:Response)=>{
    res.status(404);
    res.json('Recurso não encontrado!');
});

//server start
server.listen(process.env.PORT, ()=>{
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});