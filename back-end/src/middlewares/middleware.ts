import express, { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const verificaTokenValido = (req: Request, res: Response, next:NextFunction) => {
    const token: string = req.headers.authorization as string;      
    if (!token) {
        res.status(401).end();
    }
    try {
        jwt.verify(token, 'random_key', (err, decoded) => {
            if (err) {
                res.status(401).end();
            } else {
                next();
            }
        });

    }
    catch (e) {
        res.status(500).end();
    }    
}