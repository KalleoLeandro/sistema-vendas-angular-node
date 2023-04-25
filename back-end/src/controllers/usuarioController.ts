import { Request, Response } from 'express';
import { ListaUsuariosResponse, UsuarioRequest } from '../models/Usuario';
import { buscarUsuarioPorId, cadastrarUsuario, listarUsuarios } from '../services/usuarioServices';
import { buscarLoginPorId } from '../services/loginServices';

export const validarFormulario = (req: Request, res: Response) => {
    res.status(200).end();
}

export const cadastrar = async (req: Request, res: Response) => {
    const usuario: UsuarioRequest = req.body;
    const teste = await cadastrarUsuario(usuario);
    if (teste) {
        res.status(201).json("Cadastro efetuado com sucesso!");
    }
    res.status(500).end();
}

export const listaUsuarios = async (req:Request, res:Response)=>{
    const listaUsuarios:Array<ListaUsuariosResponse> = await listarUsuarios();
    if(listaUsuarios){
        res.status(200).json(listaUsuarios);
    } else {
        res.status(500).end();
    }
}

export const listarUsuarioPorId = async (req:Request, res:Response)=>{
    const id:any = req.query.id;
    const usuario:UsuarioRequest = await buscarUsuarioPorId(id);
    if(usuario){
        res.status(200).json(usuario);
    } else {
        res.status(500).end();
    }
}