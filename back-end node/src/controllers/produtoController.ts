import { Request, Response } from 'express';
import { Produto } from '../models/Produto';
import { cadastrarProduto, listarProdutos } from '../services/produtoService';

export const cadastrarProdutos = async (req: Request, res: Response) => {
    const produto:Produto = req.body;        
    const resultado: boolean = await cadastrarProduto(produto);
    console.log(resultado);
    if(resultado){
        res.status(201).json("Produto Cadastrado com sucesso!");
    } else {
        res.status(500).json("Erro ao cadastrar produto!");
    }    
}

export const listaProdutos = async (req:Request, res: Response) =>{
    const listaProdutos: Array<Produto> = await listarProdutos();
    if (listaProdutos) {
        res.status(200).json(listaProdutos);
    } else {
        res.status(500).end();
    }
}