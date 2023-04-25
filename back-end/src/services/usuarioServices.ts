const pool = require('../db/conn');
import { ListaUsuariosResponse, UsuarioEditResponse, UsuarioRequest } from '../models/Usuario';

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

export const listarUsuarios = async (): Promise<Array<ListaUsuariosResponse>> => {
    const sql = `select * from usuario`;
    const promisePool = pool.promise();
    try {
        const [rows]: [Array<ListaUsuariosResponse>] = await promisePool.query(sql);
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const buscarUsuarioPorId = async (id: any): Promise<UsuarioEditResponse> => {
    const sql = `select usuario.nome, usuario.cpf, usuario.data_nascimento, usuario.sexo, usuario.dados_login_id, usuario.endereco_id, usuario.contato_id,
    contato.telefone, contato.celular, contato.email,
    endereco.cep, endereco.rua, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf,
    dados_login.login, dados_login.perfil
    from usuario inner join contato inner join endereco inner join dados_login 
    on contato.id = usuario.contato_id AND
    endereco.id = usuario.endereco_id AND
    dados_login.id = usuario.dados_login_id
    where usuario.id = ?
    LIMIT 1`;
    const values = [id];
    const promisePool = pool.promise();
    try {
        const user: UsuarioEditResponse = await promisePool.query(sql, values);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}


export const rollback = () => {
    pool.getConnection((err: Error, connection: any) => {
        connection.rollback(() => {
            connection.release();
        })

    });
}

export const commit = () => {
    pool.getConnection((err: Error, connection: any) => {
        connection.commit(() => {
            connection.release();
        });
    });
}        