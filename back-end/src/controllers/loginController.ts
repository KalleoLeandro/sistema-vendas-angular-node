import { Request, Response } from 'express';
import { decriptografia } from '../utils/utils';

import { LoginRequest } from '../models/Login';
import { validarToken, buscarLogin, gerarToken, validarLogin, retornaLogin } from '../services/loginServices';

export const logar = async (req: Request, res: Response) => {

    const hash: string = req.body.hash;
    const login: LoginRequest = JSON.parse(decriptografia(hash));
    try {
        const validar: number = await validarLogin(login);
        if (validar === 401) {
            res.status(401).end();
        } else if (validar === 200) {
            res.status(200);
            const token: any = await gerarToken(await buscarLogin(login));
            res.json({ auth: true, token: token });
        } else {
            res.status(500).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}

export const validaToken = async (req: Request, res: Response) => {
    const token: string = req.headers.authorization as string;
    try {
        const resposta = await validarToken(token);
        switch (resposta) {
            case 401:
                res.status(401).end();
                break;
            case 403:
                res.status(403).end();
                break;
            case 200:
                res.status(200).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}

export const userPorToken = async (req: Request, res: Response) => {
    const token: string = req.headers.authorization as string;
    try {
        const nomeLogin: string = await retornaLogin(token);        
        if(nomeLogin){
            res.status(200).json({ login: nomeLogin });
        } else {

        }
        res.status(500).end();
    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}