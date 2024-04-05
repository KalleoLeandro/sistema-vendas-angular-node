const pool = require('../db/conn');
import { Request, Response } from 'express';
import { gravarVenda } from '../services/vendaService';

export const efetuarVenda = async (req: Request, res: Response) => {
    const token:string = req.body.token;    
    const produtos:Array<any> = req.body.produtos;    
    const resultado: boolean = await gravarVenda(produtos,token);
    if (resultado) {
        res.status(201).json("Venda efetuada com sucesso!");
    } else {
        res.status(500).json("Erro ao efetuar venda!");
    }
}