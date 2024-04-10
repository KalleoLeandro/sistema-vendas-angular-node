import { Request, Response } from 'express';
import { Produto } from '../models/Produto';
import { atualizarProduto, buscarProdutoPorId, cadastrarProduto, excluirProduto, listarProdutos, buscarProdutosPorNome, atualizarRemocaoProdutos, atualizarAdicaoProdutos } from '../services/produtoService';

export const cadastrarProdutos = async (req: Request, res: Response) => {
    const produto: Produto = req.body;
    const resultado: boolean = await cadastrarProduto(produto);
    if (resultado) {
        res.status(201).json("Produto Cadastrado com sucesso!");
    } else {
        res.status(500).json("Erro ao cadastrar produto!");
    }
}

export const listaProdutos = async (req: Request, res: Response) => {
    const listaProdutos: Array<Produto> = await listarProdutos();
    if (listaProdutos.length > 0) {
        res.status(200).json(listaProdutos);
    } else {
        res.status(500).end();
    }
}

export const listarProductPorId = async (req: Request, res: Response) => {
    const id: any = req.query.id;    
    try{
        const produto: Produto = await buscarProdutoPorId(id);    
        if (produto != null) {        
            res.status(200).json(produto);
        } else {
            res.status(200).json({message:"Não há produtos com o id selecionado!"});
        }
    }catch(e){
        res.status(500).end();
    }    
}

export const listaProdutosPorNome = async (req: Request, res: Response) => {
    const nome: any = req.params.nome;
    const listaProdutos: Array<Produto> = await buscarProdutosPorNome(nome);
    if (listaProdutos.length > 0) {
        res.status(200).json(listaProdutos);
    } else {
        res.status(500).end();
    }
}

export const atualizarProduct = async (req: Request, res: Response) => {
    const dados: Produto = req.body;
    const resultado: boolean = await atualizarProduto(dados);
    if (resultado) {
        res.status(200).json("Usuário atualizado com sucesso!");
    } else {
        res.status(500).end();
    }
}

export const excluirProduct = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    const resultado: boolean = await excluirProduto(id);
    if (resultado) {
        res.status(204).json("Produto excluído com sucesso!");
    } else {
        res.status(500).end();
    }
}

export const adicionarProdutos = async (req: Request, res: Response) => {
    const produtos: any = req.body.produtos;
    const resultado: boolean = await atualizarAdicaoProdutos(produtos);
    if (resultado) {
        res.status(204).json("Produto adicionado com sucesso!");
    } else {
        res.status(500).end();
    }
    res.status(200);
}

export const removerProdutos = async (req: Request, res: Response) => {
    const produtos: any = req.body.produtos;    
    const resultado: boolean = await atualizarRemocaoProdutos(produtos);
    if (resultado) {
        res.status(204).json("Produto excluído com sucesso!");
    } else {
        res.status(500).end();
    }
}