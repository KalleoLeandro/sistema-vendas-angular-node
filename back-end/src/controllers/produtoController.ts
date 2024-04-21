import { Request, Response } from 'express';
import { cadastrarProduto, listarProdutos, buscarProdutoPorId, buscarProdutosPorNome, atualizarProduto, excluirProduto, atualizarAdicaoProdutos, atualizarRemocaoProdutos } from '../services/produtoService';
import { Produto } from '../models/Produto';

export const cadastrarProdutos = async (req: Request, res: Response) => {
    const produto: Produto = req.body;
    try {
        const resultado: boolean = await cadastrarProduto(produto);
        if (resultado) {
            res.status(201).json("Produto cadastrado com sucesso!");
        } else {
            res.status(500).json("Erro ao cadastrar produto!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const listaProdutos = async (req: Request, res: Response) => {
    try {
        const listaProdutos: Array<Produto> = await listarProdutos();
        res.status(200).json(listaProdutos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const listarProductPorId = async (req: Request, res: Response) => {
    const id: any = req.query.id;    
    try {
        const produto: Produto = await buscarProdutoPorId(id);
        if (produto) {
            res.status(200).json(produto);
        } else {
            res.status(200).json({ message: "Não há produtos com o ID selecionado!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const listaProdutosPorNome = async (req: Request, res: Response) => {
    const nome: any = req.params.nome;
    try {
        const listaProdutos: Array<Produto> = await buscarProdutosPorNome(nome);
        res.status(200).json(listaProdutos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const atualizarProduct = async (req: Request, res: Response) => {
    const dados: Produto = req.body;
    try {
        const resultado: boolean = await atualizarProduto(dados);
        if (resultado) {
            res.status(200).json("Produto atualizado com sucesso!");
        } else {
            res.status(500).json("Erro ao atualizar produto!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const excluirProduct = async (req: Request, res: Response) => {
    const id: any = req.params.id;
    try {
        const resultado: boolean = await excluirProduto(id);
        if (resultado) {
            res.status(204).json("Produto excluído com sucesso!");
        } else {
            res.status(500).json("Erro ao excluir produto!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const adicionarProdutos = async (req: Request, res: Response) => {
    const produtos: any = req.body.produtos;
    try {
        const resultado: boolean = await atualizarAdicaoProdutos(produtos);
        if (resultado) {
            res.status(204).json("Produto(s) adicionado(s) com sucesso!");
        } else {
            res.status(500).json("Erro ao adicionar produto(s)!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const removerProdutos = async (req: Request, res: Response) => {
    const produtos: any = req.body.produtos;
    try {
        const resultado: boolean = await atualizarRemocaoProdutos(produtos);
        if (resultado) {
            res.status(204).json("Produto(s) removido(s) com sucesso!");
        } else {
            res.status(500).json("Erro ao remover produto(s)!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}
