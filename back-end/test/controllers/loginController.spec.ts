import * as loginController from '../../src/controllers/loginController';
import { gerarToken, validarLogin, validarToken, retornaLogin } from '../../src/services/loginServices';
import { decriptografia } from '../../src/utils/utils';
import express, { Request, Response } from 'express';

jest.mock('../../src/services/loginServices', () => ({
    validarLogin: jest.fn(),
    buscarLogin: jest.fn(),
    gerarToken: jest.fn(),
    validarToken: jest.fn(),
    retornaLogin: jest.fn()
    
}));

// Mock da função decriptografia
jest.mock('../../src/utils/utils', () => ({
    decriptografia: jest.fn()
}));

describe('Testes do método logar da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste login retorna 200', async () => {
        
        const req  = {
            body: {
                hash: 'teste'
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };
        
        // Simulando um objeto de requisição completo
        (validarLogin as jest.Mock).mockImplementation(() => Promise.resolve(200));
        
        // Mockando a função gerarToken para retornar o token desejado
        (gerarToken as jest.Mock).mockImplementation(() => Promise.resolve({ token: 'teste' }));        
        (decriptografia as jest.Mock).mockImplementation(() => {
            return '{"usuario": "test", "senha": "password"}';
        });

        await loginController.logar(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith({ auth: true, token: {
            token: 'teste' 
        }});     
    });

    it('teste login retorna 401', async () => {
        
        const req  = {
            body: {
                hash: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };
        
        // Simulando um objeto de requisição completo
        (validarLogin as jest.Mock).mockImplementation(() => Promise.resolve(401));
        
        // Mockando a função gerarToken para retornar o token desejado
        (gerarToken as jest.Mock).mockImplementation(() => Promise.resolve({ token: 'teste' }));        
        (decriptografia as jest.Mock).mockImplementation(() => {
            return '{"usuario": "test", "senha": "password"}';
        });

        await loginController.logar(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('teste login retorna 401', async () => {
        
        const req  = {
            body: {
                hash: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };
        
        // Simulando um objeto de requisição completo
        (validarLogin as jest.Mock).mockImplementation(() => Promise.resolve(401));
        
        // Mockando a função gerarToken para retornar o token desejado
        (gerarToken as jest.Mock).mockImplementation(() => Promise.resolve({ token: 'teste' }));        
        (decriptografia as jest.Mock).mockImplementation(() => {
            return '{"usuario": "test", "senha": "password"}';
        });

        await loginController.logar(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('teste login retorna 500 devido validarLogin', async () => {
        
        const req  = {
            body: {
                hash: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };
        
        // Simulando um objeto de requisição completo
        (validarLogin as jest.Mock).mockImplementation(() => Promise.resolve(500));
        
        // Mockando a função gerarToken para retornar o token desejado
        (gerarToken as jest.Mock).mockImplementation(() => Promise.resolve({ token: 'teste' }));        
        (decriptografia as jest.Mock).mockImplementation(() => {
            return '{"usuario": "test", "senha": "password"}';
        });

        await loginController.logar(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(500);
    });

    it('teste login retorna 500 devido exception', async () => {
        
        const req  = {
            body: {
                hash: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };
        
        // Simulando um objeto de requisição completo
        (validarLogin as jest.Mock).mockImplementation(() => Promise.reject(500));
        
        // Mockando a função gerarToken para retornar o token desejado
        (gerarToken as jest.Mock).mockImplementation(() => Promise.resolve({ token: 'teste' }));        
        (decriptografia as jest.Mock).mockImplementation(() => {
            return '{"usuario": "test", "senha": "password"}';
        });

        await loginController.logar(req as any, res as any);

        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(500);
    });
});

describe('Testes do método validaToken da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste validarToken retorna 200', async ()=>{
        const req  = {
            headers: {
                authorization: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (validarToken as jest.Mock).mockImplementation(() => Promise.resolve(200));

        await loginController.validaToken(req as any,res as any);
        
        // Verifica se a função status foi chamada com 200
        expect(res.status).toHaveBeenCalledWith(200);
    });

    it('teste validarToken retorna 401', async ()=>{
        const req  = {
            headers: {
                authorization: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (validarToken as jest.Mock).mockImplementation(() => Promise.resolve(401));

        await loginController.validaToken(req as any,res as any);
        
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('teste validarToken retorna 403', async ()=>{
        const req  = {
            headers: {
                authorization: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (validarToken as jest.Mock).mockImplementation(() => Promise.resolve(403));

        await loginController.validaToken(req as any,res as any);
        
        
        expect(res.status).toHaveBeenCalledWith(403);
    });

    it('teste validarToken retorna 500', async ()=>{
        const req  = {
            headers: {
                authorization: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (validarToken as jest.Mock).mockImplementation(() => Promise.resolve(500));

        await loginController.validaToken(req as any,res as any);
        
        
        expect(res.status).toHaveBeenCalledWith(500);
    });

    it('teste validarToken retorna 500 devido exception', async ()=>{
        const req  = {
            headers: {
                authorization: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (validarToken as jest.Mock).mockImplementation(() => Promise.reject(500));

        await loginController.validaToken(req as any,res as any);
        
        
        expect(res.status).toHaveBeenCalledWith(500);
    });
});

describe('Testesdo método userPorToken da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste userPorToken retorna 200 e objeto', async ()=>{
        const req  = {
            headers: {
                authorization: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (retornaLogin as jest.Mock).mockImplementation(() => Promise.resolve("admin"));

        await loginController.userPorToken(req as any,res as any);

        
        expect(res.status).toHaveBeenCalledWith(200);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith({ login: 'admin'}); 
    });

    it('teste userPorToken retorna 500', async ()=>{
        const req  = {
            headers: {
                authorization: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (retornaLogin as jest.Mock).mockImplementation(() => Promise.resolve(''));

        await loginController.userPorToken(req as any,res as any);

        
        expect(res.status).toHaveBeenCalledWith(500);
    });

    it('teste userPorToken retorna 500 devido exception', async ()=>{
        const req  = {
            headers: {
                authorization: 'teste'
            }
        } as any as Request
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (retornaLogin as jest.Mock).mockImplementation(() => Promise.reject(500));

        await loginController.userPorToken(req as any,res as any);

        
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
