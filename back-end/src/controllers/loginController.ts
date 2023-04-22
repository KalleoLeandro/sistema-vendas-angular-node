import { Request, Response } from 'express';
import { decriptografia } from '../utils/utils';
import * as jwt from 'jsonwebtoken';

const pool = require('../db/conn');
var forge = require('node-forge');

export const logar = async (req: Request, res: Response) => {

    const hash: string = req.body.hash;
    const json = JSON.parse(decriptografia(hash));

    const sql = `select * from login where usuario = ? and senha = ?`;
    const values = [json.usuario, json.senha];
    await pool.query(sql, values, (err: Error, data: any) => {
        if (err) {            
            res.status(500);
            res.end();
        } else {
            const usuario = data;            
            if (usuario.length > 0) {
                res.status(200);                               
                const token: any = jwt.sign({ userId: usuario[0].id, userType: usuario[0].tipoUsuario }, 'random_key', { expiresIn: '1h' });                
                res.json({ auth: true, token: token });
            } else {
                res.status(401);
                res.end();
            }
        }
    });
}

export const validarToken = async (req: Request, res: Response) => {
    const token = req.headers.authorization;      
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    try{
        await jwt.verify(token, 'random_key', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Falha na autenticação do token' });
            }                    
        });
        // O token é válido, continue com a execução da rota protegida    
        res.status(200).end();
    }
    catch(e){
        res.status(500).end();
    }    
}