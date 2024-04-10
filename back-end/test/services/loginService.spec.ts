import express, { Request, Response, query } from 'express';
import * as loginService from '../../src/services/loginServices';
import { LoginRequest } from '../../src/models/Login';
const pool = require('../../src/db/conn');


const mockQuery = jest.fn();

// Mockando o pool de conexões
jest.mock('../../src/db/conn', () => ({
  promise: jest.fn(() => ({
    query: mockQuery // Usando o mock da função query
  }))
}));

let params: LoginRequest = {
    usuario: '',
    senha: ''
};

describe('Testes do método validarLogin da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        params  = {
            usuario: 'teste',
            senha: 'teste'
        }        
        jest.clearAllMocks();
    });

    it('teste validarLogin retorna 500', async () => {
        
        (mockQuery as jest.Mock).mockRejectedValueOnce(() => Promise.reject(new Error));

        // Chama a função validarLogin com os parâmetros
        const retorno = await loginService.validarLogin(params);       
    
        // Verifica se o retorno é 500
        expect(retorno).toBe(500);
    })

    
    it('teste validarLogin retorna 200', async () => {
        
        (mockQuery as jest.Mock).mockResolvedValueOnce([[{ login: 'usuário válido', senha: 'senha válida' }]]);
        params  = {
            usuario: 'teste',
            senha: 'teste'
        } 

        // Chama a função validarLogin com os parâmetros
        const retorno = await loginService.validarLogin(params);       
    
        // Verifica se o retorno é 500
        expect(retorno).toBe(200);
    })
});
