import { Options } from 'swagger-jsdoc';
import { Usuario } from '../models/Usuario';
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
  components: {
    schemas: {
      Usuario: {
        $ref:  './models/Usuario' // Corrigindo o caminho da referência
      }
    }
  },
  apis: [path.join(__dirname,'../routes/rotas.ts')], 
};

export default swaggerOptions;