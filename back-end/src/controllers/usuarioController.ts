import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import { atualizarUsuario, buscarUsuarioPorId, cadastrarUsuario, excluirUsuario, listarUsuarios } from '../services/usuarioServices';

export const validarFormulario = (req: Request, res: Response) => {
    res.status(200).end();
}

export const cadastrarUser = async (req: Request, res: Response) => {
    const usuario: Usuario = req.body;
    try {
        const sucesso = await cadastrarUsuario(usuario);
        if (sucesso) {
            res.status(201).json("Cadastro efetuado com sucesso!");
        } else {
            res.status(400).json({ message: 'Falha ao cadastrar usuário.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const listaUsuarios = async (req: Request, res: Response) => {
    try {
        const listaUsuarios: Array<Usuario> = await listarUsuarios();
        res.status(200).json(listaUsuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const listarUsuarioPorId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const usuario: Usuario = await buscarUsuarioPorId(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const atualizarUser = async (req: Request, res: Response) => {
    const dados: Usuario = req.body;
    try {
        const sucesso = await atualizarUsuario(dados);
        if (sucesso) {
            res.status(200).json("Usuário atualizado com sucesso!");
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}

export const excluirUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const sucesso = await excluirUsuario(Number(id));
        if (sucesso) {
            res.status(204).json("Usuário excluído com sucesso!");
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
}