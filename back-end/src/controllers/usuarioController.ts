import { Request, Response } from 'express';
const pool = require('../db/conn');
import { UsuarioRequest } from '../models/UsuarioRequest';
import { cadastrarUsuario } from '../services/cadastroServices';

export const validarFormulario = (req: Request, res: Response) => {
    res.status(200).end();
}

export const cadastrar = async (req: Request, res: Response) => {
    const usuario:UsuarioRequest= req.body;
    const teste = await cadastrarUsuario(usuario);
    if(teste){        
        res.status(201).json("Cadastro efetuado com sucesso!");
    }
    res.status(500).end();
}
/*
export const cadastrar = async (req: Request, res: Response) => {
    const usuario: Usuario = req.body;
    const sql_endereco = `insert into endereco (rua, numero, complemento, bairro, cidade, uf) values(?,?,?,?,?,?)`;
    const values = [usuario.rua, usuario.numero, usuario.complemento, usuario.bairro, usuario.cidade, usuario.uf];
    await pool.query(sql_endereco, values, async (err: Error, data: any) => {
        if (err) {
            await pool.query("rollback", (err: Error, data: any) => {                
                res.status(500).end();
            });
        }
        else {
            usuario.endereco_id = parseInt(data.insertId as string);
            const sql_contato = `insert into contato (telefone, celular, email) values(?,?,?)`;
            const values = [usuario.telefone, usuario.celular, usuario.email];
            await pool.query(sql_contato, values, async (err: Error, data: any) => {
                if (err) {
                    await pool.query("rollback", (err: Error, data: any) => {
                        res.status(500).end();
                    });
                }
                else {
                    usuario.contato_id = parseInt(data.insertId as string);
                    const sql_login = `insert into dados_login (login, senha, perfil) values(?,?,?)`;
                    const values = [usuario.login, usuario.senha, usuario.perfil];
                    await pool.query(sql_login, values, async (err: Error, data: any) => {
                        if (err) {
                            await pool.query("rollback", (err: Error, data: any) => {
                                res.status(500).end();
                            });
                        } else {
                            usuario.dados_login_id = parseInt(data.insertId as string);
                            const sql_usuario = `insert into usuario (nome, cpf, sexo, data_nascimento, endereco_id, dados_login_id, contato_id) values(?,?,?,?,?,?,?)`;
                            const values = [usuario.nome, usuario.cpf, usuario.sexo, usuario.dataNascimento, usuario.endereco_id, usuario.dados_login_id, usuario.contato_id];
                            await pool.query(sql_usuario, values, async (err: Error, data: any) => {
                                if (err) {
                                    await pool.query("rollback", (err: Error, data: any) => {
                                        res.status(500).end();
                                    });
                                } else {
                                    await pool.query("commit", (err: Error, data: any) => {
                                        if (err) {
                                            res.status(500).end();
                                        } else {
                                            res.status(201).json("Usuário cadastrado com sucesso!");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    );
}*/