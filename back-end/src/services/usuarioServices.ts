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
    const sql = `select * from usuario where id not in(1)`;
    const promisePool = pool.promise();
    try {
        const [rows]: [Array<ListaUsuariosResponse>] = await promisePool.query(sql);
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const atualizarUsuario = async (userEdit: UsuarioEditResponse) => {
    if (userEdit.id === 1) {
        return false;
    }
    await atualizarEndereco(userEdit);
    await atualizarContato(userEdit);
    await atualizarDadosLogin(userEdit);
    const sql = `update usuario set nome = ?, cpf = ?, data_nascimento = ?, sexo = ? where id = ?`;
    const values = [userEdit.nome, userEdit.cpf, userEdit.dataNascimento, userEdit.sexo, userEdit.id];
    const promisePool = pool.promise();
    let valor: Array<any> = await promisePool.query(sql, values, (err: Error, data: any) => {
        if (err) {
            rollback();
            throw new Error();
        } else {
            commit();
        }

    });
    return true;
}

export const atualizarEndereco = async (userEdit: UsuarioEditResponse) => {
    const sql = `update endereco set cep = ?, rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, uf = ? where id = ?`;
    const values = [userEdit.cep, userEdit.rua, userEdit.numero, userEdit.complemento, userEdit.bairro, userEdit.cidade, userEdit.uf, userEdit.endereco_id];
    const promisePool = pool.promise();
    let valor: Array<any> = await promisePool.query(sql, values, (err: Error, data: any) => {
        if (err) {
            rollback();
            throw new Error();
        }
    });
}

export const atualizarContato = async (userEdit: UsuarioEditResponse) => {
    const sql = `update contato set telefone = ?, celular = ?, email = ? where id = ?`
    const values = [userEdit.telefone, userEdit.celular, userEdit.email, userEdit.contato_id];
    const promisePool = pool.promise();
    let valor: Array<any> = await promisePool.query(sql, values, (err: Error, data: any) => {
        if (err) {
            rollback();
            throw new Error();
        }
    });
}

export const atualizarDadosLogin = async (userEdit: UsuarioEditResponse) => {
    const sql = `update dados_login set login = ?, senha = ?, perfil = ? where id = ?`;
    const values = [userEdit.login, userEdit.senha, userEdit.perfil, userEdit.dados_login_id];
    const promisePool = pool.promise();
    let valor: Array<any> = await promisePool.query(sql, values, (err: Error, data: any) => {
        if (err) {
            rollback();
            throw new Error();
        }
    });
}

export const buscarUsuarioPorId = async (id: any): Promise<UsuarioEditResponse> => {
    const sql = `select usuario.id, usuario.nome, usuario.cpf, usuario.data_nascimento, usuario.sexo, usuario.dados_login_id, usuario.endereco_id, usuario.contato_id,
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

export const excluirUsuario = async (id: number) => {
    
    try {
        const usuario:any = await buscarUsuarioPorId(id);                              
        const sql = `delete from usuario where id = ?`
        const values = [id];
        const promisePool = pool.promise();
        await promisePool.query(sql, values);               
        await excluirEndereco(usuario[0][0].endereco_id);
        await excluirContato(usuario[0][0].contato_id);
        await excluirDadosLogin(usuario[0][0].dados_login_id);         
        return true;
    }
    catch (err) {
        console.error(err);
        throw new Error;
    }
}


export const excluirEndereco = async (id: number) => {
    const sql = `delete from endereco where id = ?`
    const values = [id];
    const promisePool = pool.promise();
    try {
        await promisePool.query(sql, values);
        return true;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

export const excluirContato = async (id: number) => {
    const sql = `delete from contato where id = ?`
    const values = [id];
    const promisePool = pool.promise();
    try {
        await promisePool.query(sql, values);
        return true;
    } catch (err) {
        console.error(err);
        throw new Error;
    }
}

export const excluirDadosLogin = async (id: number) => {
    const sql = `delete from dados_login where id = ?`
    const values = [id];
    const promisePool = pool.promise();
    try {
        await promisePool.query(sql, values);
        return true;
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