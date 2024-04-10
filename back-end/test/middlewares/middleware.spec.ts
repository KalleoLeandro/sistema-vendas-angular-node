// authMiddleware.test.ts
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { verificaTokenValido } from '../../src/middlewares/middleware';

// Mock para o módulo 'jsonwebtoken'
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

describe('Middleware de autenticação', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: jest.Mock;

    beforeEach(() => {
        req = { headers: { authorization: '' } };
        res = { status: jest.fn().mockReturnThis(), end: jest.fn() };
        next = jest.fn();
    });

    it('Deve retornar status 401 se não houver token', () => {
        verificaTokenValido(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('Deve retornar status 401 se o token for inválido', () => {
        (req.headers as any).authorization = 'invalid_token';
        (jwt.verify as jest.Mock).mockImplementation((token, key, callback) => {
            callback(new Error('Invalid token'));
        });
        verificaTokenValido(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('Deve chamar o próximo middleware se o token for válido', () => {
        (req.headers as any).authorization = 'valid_token';
        (jwt.verify as jest.Mock).mockImplementation((token, key, callback) => {
            callback(null, { userId: 123 });
        });
        verificaTokenValido(req as Request, res as Response, next);
        expect(next).toHaveBeenCalled();
    });

    it('Deve retornar status 500 se ocorrer um erro interno', () => {
        (req.headers as any).authorization = 'valid_token';
        (jwt.verify as jest.Mock).mockImplementation((token, key, callback) => {
            throw new Error('Internal Server Error');
        });
        verificaTokenValido(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
