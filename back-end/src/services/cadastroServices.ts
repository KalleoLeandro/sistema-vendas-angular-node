const pool = require('../db/conn');
import { UsuarioRequest } from '../models/UsuarioRequest';

export const cadastrarUsuario = async (usuario: UsuarioRequest): Promise<boolean> => {
    let teste: boolean = true;
    let endereco_id: number = await cadastrarEndereco(usuario, teste);
    let contato_id: number = await cadastrarContato(usuario, teste);
    let dados_login_id: number = await cadastrarLogin(usuario, teste);
    await cadastrarDadosPessoais(usuario, teste, endereco_id, contato_id, dados_login_id);    
    if (teste) {
        await commit();
    } else {
        await rollback();
    }
    return teste;
}

export const cadastrarEndereco = async (usuario: UsuarioRequest, teste: boolean) => {
    const sql_endereco = `insert into endereco (rua, numero, complemento, bairro, cidade, uf) values(?,?,?,?,?,?)`;
    const values = [usuario.rua, usuario.numero, usuario.complemento, usuario.bairro, usuario.cidade, usuario.uf];
    const promisePool = pool.promise();
    let valor: Array<any> = await promisePool.query(sql_endereco, values, (err: Error, data: any) => {
        if (err) {
            teste = false;
        }
    });
    return valor[0].insertId as number;
}

export const cadastrarContato = async (usuario: UsuarioRequest, teste: boolean) => {
    const sql_contato = `insert into contato (telefone, celular, email) values(?,?,?)`;
    const values = [usuario.telefone, usuario.celular, usuario.email];
    const promisePool = pool.promise();
    let valor: Array<any> = await promisePool.query(sql_contato, values, (err: Error, data: any) => {
        if (err) {
            teste = false;
        }
    });
    return valor[0].insertId as number;
}

export const cadastrarLogin = async (usuario: UsuarioRequest, teste: boolean) => {
    const sql_login = `insert into dados_login (login, senha, perfil) values(?,?,?)`;
    const values = [usuario.login, usuario.senha, usuario.perfil];
    const promisePool = pool.promise();
    let valor: Array<any> = await promisePool.query(sql_login, values, (err: Error, data: any) => {
        if (err) {
            teste = false;
        }
    });
    return valor[0].insertId as number;
}

export const cadastrarDadosPessoais = async (usuario: UsuarioRequest, teste: boolean, endereco_id: number, contato_id: number, dados_login_id: number) => {
    const sql_usuario = `insert into usuario (nome, cpf, sexo, data_nascimento, endereco_id, dados_login_id, contato_id) values(?,?,?,?,?,?,?)`;
    const values = [usuario.nome, usuario.cpf, usuario.sexo, usuario.dataNascimento, endereco_id, dados_login_id, contato_id];
    const promisePool = pool.promise();
    let valor: Array<any> = await promisePool.query(sql_usuario, values, (err: Error, data: any) => {
        if (err) {
            teste = false;
        }
    });
}

export const rollback = () => {
    pool.getConnection((err:Error,connection:any)=>{
        connection.rollback(()=>{
            connection.release();
        })

    });
}

export const commit = () => {    
    pool.getConnection((err:Error,connection:any)=>{
        connection.commit(()=>{
            connection.release();
        })

    });
}        