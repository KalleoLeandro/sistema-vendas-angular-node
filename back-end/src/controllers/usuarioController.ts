import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import { atualizarUsuario, buscarUsuarioPorId, cadastrarUsuario, excluirUsuario, listarUsuarios } from '../services/usuarioServices';

export const validarFormulario = (req: Request, res: Response) => {
    res.status(200).end();
}

export const cadastrarUser = async (req: Request, res: Response) => {
    const usuario: Usuario = req.body;
    const teste = await cadastrarUsuario(usuario);
    if (teste) {
        res.status(201).json("Cadastro efetuado com sucesso!");
    }
    res.status(500).end();
}

export const listaUsuarios = async (req: Request, res: Response) => {
    const listaUsuarios: Array<Usuario> = await listarUsuarios();
    if (listaUsuarios.length > 0) {
        res.status(200).json(listaUsuarios);
    } else {
        res.status(500).json({message:"Erro interno do servidor", statusCode: 500, service: "usuarioServices"});
    }
}

export const listarUsuarioPorId = async (req: Request, res: Response) => {
    const id: any = req.query.id;
    const usuario: Usuario = await buscarUsuarioPorId(id);
    if (usuario) {
        res.status(200).json(usuario);
    } else {
        res.status(500).end();
    }
}

export const atualizarUser = async (req: Request, res: Response) => {        
    const dados: Usuario = req.body;
    const resultado: boolean = await atualizarUsuario(dados);
    if (resultado) {
        res.status(200).json("Usuário atualizado com sucesso!");
    } else {
        res.status(500).end();
    }    
}

export const excluirUser = async (req: Request, res: Response) =>{
    const id: any = req.params.id;
    const resultado: boolean = await excluirUsuario(id);
    if (resultado) {
        res.status(204).json("Usuário excluído com sucesso!");
    } else {
        res.status(500).end();
    }       
}