import { Request, Response } from 'express';
import { Produto } from '../models/Produto';
import { atualizarProduto, buscarProdutoPorId, cadastrarProduto, excluirProduto, listarProdutos } from '../services/produtoService';

export const cadastrarProdutos = async (req: Request, res: Response) => {
    const produto:Produto = req.body;        
    const resultado: boolean = await cadastrarProduto(produto);    
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

export const listarProductPorId = async(req:Request, res: Response)=>{
    const id: any = req.query.id;
    const produto: Produto = await buscarProdutoPorId(id);
    if (produto) {
        res.status(200).json(produto);
    } else {
        res.status(500).end();
    }
}

export const atualizarProduct = async (req:Request, res: Response) =>{
    const dados: Produto = req.body;
    const resultado: boolean = await atualizarProduto(dados);
    if (resultado) {
        res.status(200).json("Usuário atualizado com sucesso!");
    } else {
        res.status(500).end();
    }    
}

export const excluirProduct = async (req:Request, res: Response) =>{
    const id: any = req.params.id;
    const resultado: boolean = await excluirProduto(id);
    if (resultado) {
        res.status(204).json("Produto excluído com sucesso!");
    } else {
        res.status(500).end();
    }       
}