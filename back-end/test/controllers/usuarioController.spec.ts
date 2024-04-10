import * as usuarioController from '../../src/controllers/usuarioController';
import { Usuario } from '../../src/models/Usuario';
import express, { Request, Response } from 'express';
import { atualizarUsuario, buscarUsuarioPorId, cadastrarUsuario, excluirUsuario, listarUsuarios } from '../../src/services/usuarioServices';

jest.mock('../../src/services/usuarioServices', () => ({
    cadastrarUsuario: jest.fn(),
    cadastrarEndereco: jest.fn(),
    cadastrarContato: jest.fn(),
    cadastrarLogin: jest.fn(),
    cadastrarDadosPessoais: jest.fn(),
    listarUsuarios: jest.fn(),
    atualizarUsuario: jest.fn(),
    atualizarEndereco: jest.fn(),
    atualizarContato: jest.fn(),
    atualizarDadosLogin: jest.fn(),
    buscarUsuarioCompletoPorId: jest.fn(),
    buscarUsuarioPorId: jest.fn(),
    excluirUsuario: jest.fn(),
    excluirEndereco: jest.fn(),
    excluirContato: jest.fn(),
    excluirDadosLogin: jest.fn()
}));

const mockUsuario: Usuario = {
    id: 1,
    nome: 'Fulano de Tal',
    cpf: '123.456.789-00',
    dataNascimento: new Date('1990-01-01'),
    endereco_id: 1,
    dados_login_id: 1,
    contato_id: 1,
    sexo: 'Masculino',
    telefone: '1234-5678',
    celular: '98765-4321',
    email: 'fulano@example.com',
    cep: '12345-678',
    rua: 'Rua ABC',
    numero: '123',
    complemento: 'Apto 101',
    bairro: 'Centro',
    cidade: 'São Paulo',
    uf: 'SP',
    login: 'fulano123',
    senha: 'senha123',
    perfil: 'usuario'
};

describe('Testes do método validarFormulário', ()=>{
    beforeEach(() => {        
        jest.clearAllMocks();
    });

    it('Teste validarFormulário retorna 200', async ()=>{
        const req  = {
            body: {
                mockUsuario
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };        

        await usuarioController.validarFormulario(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(200);        
    })
});

describe('Testes do método cadastrarUsuario', ()=>{
    beforeEach(() => {        
        jest.clearAllMocks();
    });

    it('Teste cadastrarUsuario retorna 201', async ()=>{
        const req  = {
            body: {
                mockUsuario
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (cadastrarUsuario as jest.Mock).mockImplementation(() => Promise.resolve(true));

        await usuarioController.cadastrarUser(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(201);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith("Cadastro efetuado com sucesso!"); 
    });

    it('Teste cadastrarUsuario retorna 500', async ()=>{
        const req  = {
            body: {
                mockUsuario
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (cadastrarUsuario as jest.Mock).mockImplementation(() => Promise.resolve(false));

        await usuarioController.cadastrarUser(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(500);
    })
});

describe('Testes do método listarUsuarios', ()=>{
    beforeEach(() => {        
        jest.clearAllMocks();
    });

    it('Teste listarUsuarios retorna 200', async ()=>{
        const req  = {

        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (listarUsuarios as jest.Mock).mockImplementation(() => Promise.resolve([{id: 1, nome: 'teste'}, {id: 2, nome: 'teste2'}]));

        await usuarioController.listaUsuarios(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith([{id: 1, nome: 'teste'}, {id: 2, nome: 'teste2'}]); 
    });

    it('Teste listarUsuarios retorna 500', async ()=>{
        const req  = {

        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),            
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (listarUsuarios as jest.Mock).mockImplementation(() => Promise.resolve([]));

        await usuarioController.listaUsuarios(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(500);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith({message:"Erro interno do servidor", statusCode: 500, service: "usuarioServices"}); 
    });
});

describe('Testes do método listarUsuarioPorId', ()=>{
    beforeEach(() => {        
        jest.clearAllMocks();
    });

    it('Teste listarUsuarioPorId retorna 200', async ()=>{
        const req  = {
            query: {
                id: 1
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (buscarUsuarioPorId as jest.Mock).mockImplementation(() => Promise.resolve({id: 1, nome: 'teste'}));

        await usuarioController.listarUsuarioPorId(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith({id: 1, nome: 'teste'}); 
    });

    it('Teste listarUsuarioPorId retorna 500', async ()=>{
        const req  = {
            query: {
                id: 1
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (buscarUsuarioPorId as jest.Mock).mockImplementation(() => Promise.resolve());

        await usuarioController.listarUsuarioPorId(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(500);
    });    
});

describe('Testes do método atualizarUser', ()=>{
    beforeEach(() => {        
        jest.clearAllMocks();
    });

    it('Teste atualizarUser retorna 200', async ()=>{
        const req  = {
            body: {
                mockUsuario
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (atualizarUsuario as jest.Mock).mockImplementation(() => Promise.resolve(true));

        await usuarioController.atualizarUser(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith("Usuário atualizado com sucesso!"); 
    });   

    it('Teste atualizarUser retorna 500', async ()=>{
        const req  = {
            body: {
                mockUsuario
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (atualizarUsuario as jest.Mock).mockImplementation(() => Promise.resolve(false));

        await usuarioController.atualizarUser(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(500);
    });  
});

describe('Testes do método excluirUser ', ()=>{
    beforeEach(() => {        
        jest.clearAllMocks();
    });

    it('Teste excluirUser  retorna 204', async ()=>{
        const req  = {
            params: {
                id: 1
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (excluirUsuario as jest.Mock).mockImplementation(() => Promise.resolve(true));

        await usuarioController.excluirUser(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(204);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith("Usuário excluído com sucesso!"); 
    });   

    it('Teste excluirUser  retorna 500', async ()=>{
        const req  = {
            params: {
                id: 1
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (excluirUsuario as jest.Mock).mockImplementation(() => Promise.resolve(false));

        await usuarioController.excluirUser(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(500);
    });  
});