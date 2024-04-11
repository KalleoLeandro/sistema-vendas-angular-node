import { Options } from 'swagger-jsdoc';
import path from 'path';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Minha API Swagger',
      version: '1.0.0',
      description: 'Uma descrição da sua API',
    },
  },  
  apis: [path.join(__dirname,'../routes/rotas.ts')], 
};

export default swaggerOptions;