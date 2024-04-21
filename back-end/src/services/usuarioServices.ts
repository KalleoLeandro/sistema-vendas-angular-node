const pool = require('../db/conn');
import { Usuario } from '../models/Usuario';

export const cadastrarUsuario = async (usuario: Usuario): Promise<boolean> => {
    let teste: boolean = true;

    try {
        const endereco_id: number = await cadastrarEndereco(usuario);
        if (endereco_id === -1) return false;
        
        const contato_id: number = await cadastrarContato(usuario);
        if (contato_id === -1) return false;
        
        const dados_login_id: number = await cadastrarLogin(usuario);
        if (dados_login_id === -1) return false;
        
        await cadastrarDadosPessoais(usuario, endereco_id, contato_id, dados_login_id);
        await commit();
    } catch (error) {
        console.error(error);
        await rollback();
        teste = false;
    }
    
    return teste;
}

export const cadastrarEndereco = async (usuario: Usuario): Promise<number> => {
    const sql_endereco = `insert into endereco (cep, rua, numero, complemento, bairro, cidade, uf) values(?,?,?,?,?,?,?)`;
    const values = [usuario.cep, usuario.rua, usuario.numero, usuario.complemento, usuario.bairro, usuario.cidade, usuario.uf];
    const promisePool = pool.promise();

    try {
        const [resultado] = await promisePool.query(sql_endereco, values);
        return resultado.insertId as number;
    } catch (error) {
        console.error(error);
        return -1; // Retorna um valor inválido para indicar falha no cadastro
    }
}

export const cadastrarContato = async (usuario: Usuario): Promise<number> => {
    const sql_contato = `insert into contato (telefone, celular, email) values(?,?,?)`;
    const values = [usuario.telefone, usuario.celular, usuario.email];
    const promisePool = pool.promise();

    try {
        const [resultado] = await promisePool.query(sql_contato, values);
        return resultado.insertId as number;
    } catch (error) {
        console.error(error);
        return -1; // Retorna um valor inválido para indicar falha no cadastro
    }
}

export const cadastrarLogin = async (usuario: Usuario): Promise<number> => {
    const sql_login = `insert into dados_login (login, senha, perfil) values(?,?,?)`;
    const values = [usuario.login, usuario.senha, usuario.perfil];
    const promisePool = pool.promise();

    try {
        const [resultado] = await promisePool.query(sql_login, values);
        return resultado.insertId as number;
    } catch (error) {
        console.error(error);
        return -1; // Retorna um valor inválido para indicar falha no cadastro
    }
}

export const cadastrarDadosPessoais = async (usuario: Usuario, endereco_id: number, contato_id: number, dados_login_id: number) => {
    const sql_usuario = `insert into usuario (nome, cpf, sexo, data_nascimento, endereco_id, dados_login_id, contato_id) values(?,?,?,?,?,?,?)`;
    const values = [usuario.nome, usuario.cpf, usuario.sexo, usuario.dataNascimento, endereco_id, dados_login_id, contato_id];
    const promisePool = pool.promise();

    try {
        await promisePool.query(sql_usuario, values);
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao cadastrar dados pessoais do usuário");
    }
}

export const listarUsuarios = async (): Promise<Array<Usuario>> => {
    const sql = `select * from usuario where id not in(1)`;
    const promisePool = pool.promise();

    try {
        const [rows]: [Array<Usuario>] = await promisePool.query(sql);
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const atualizarUsuario = async (userEdit: Usuario) => {
    if (userEdit.id === 1) {
        return false;
    }

    try {
        await atualizarEndereco(userEdit);
        await atualizarContato(userEdit);
        await atualizarDadosLogin(userEdit);
        const sql = `update usuario set nome = ?, cpf = ?, data_nascimento = ?, sexo = ? where id = ?`;
        const values = [userEdit.nome, userEdit.cpf, userEdit.dataNascimento, userEdit.sexo, userEdit.id];
        const promisePool = pool.promise();
        await promisePool.query(sql, values);
        await commit();
    } catch (error) {
        console.error(error);
        await rollback();
        throw new Error("Erro ao atualizar usuário");
    }

    return true;
}

export const atualizarEndereco = async (userEdit: Usuario) => {
    const sql = `update endereco set cep = ?, rua = ?, numero = ?, complemento = ?, bairro = ?, cidade = ?, uf = ? where id = ?`;
    const values = [userEdit.cep, userEdit.rua, userEdit.numero, userEdit.complemento, userEdit.bairro, userEdit.cidade, userEdit.uf, userEdit.endereco_id];
    const promisePool = pool.promise();

    try {
        await promisePool.query(sql, values);
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao atualizar endereço");
    }
}

export const atualizarContato = async (userEdit: Usuario) => {
    const sql = `update contato set telefone = ?, celular = ?, email = ? where id = ?`
    const values = [userEdit.telefone, userEdit.celular, userEdit.email, userEdit.contato_id];
    const promisePool = pool.promise();

    try {
        await promisePool.query(sql, values);
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao atualizar contato");
    }
}

export const atualizarDadosLogin = async (userEdit: Usuario) => {
    const sql = `update dados_login set login = ?, senha = ?, perfil = ? where id = ?`;
    const values = [userEdit.login, userEdit.senha, userEdit.perfil, userEdit.dados_login_id];
    const promisePool = pool.promise();

    try {
        await promisePool.query(sql, values);
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao atualizar dados de login");
    }
}

export const buscarUsuarioCompletoPorId = async (id: any): Promise<Usuario> => {
    const sql = `select usuario.id, usuario.nome, usuario.cpf, usuario.data_nascimento, usuario.sexo, usuario.dados_login_id, usuario.endereco_id, usuario.contato_id,
    contato.telefone, contato.celular, contato.email,
    endereco.rua, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, endereco.cep, 
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
        const user: any = await promisePool.query(sql, values);                
        return user[0][0];
    } catch (err) {
        console.error(err);
        throw new Error("Erro ao buscar usuário por ID");
    }
}

export const buscarUsuarioPorId = async (id: any): Promise<Usuario> => {
    const sql = `select * from usuario where id = ? LIMIT 1`;
    const values = [id];    
    const promisePool = pool.promise();
    try {
        const [user] = await promisePool.query(sql, values);                  
        return user;
    } catch (err) {
        console.error(err);
        throw new Error("Erro ao buscar usuário por ID");
    }
}

export const excluirUsuario = async (id: number) => {
    try {
        const usuario:any = await buscarUsuarioPorId(id);                              
        const sql = `delete from usuario where id = ?`
        const values = [id];
        const promisePool = pool.promise();
        await promisePool.query(sql, values);               
        await excluirEndereco(usuario.endereco_id);
        await excluirContato(usuario.contato_id);
        await excluirDadosLogin(usuario.dados_login_id);
        await commit();               
        return true;
    } catch (err) {
        await rollback();
        console.error(err);
        throw new Error("Erro ao excluir usuário");
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
        throw new Error("Erro ao excluir endereço");
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
        throw new Error("Erro ao excluir contato");
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
        throw new Error("Erro ao excluir dados de login");
    }
}


export const rollback = () => {
    pool.getConnection((err: Error, connection: any) => {
        connection.rollback(() => {
            connection.release();
        });
    });
}

export const commit = () => {
    pool.getConnection((err: Error, connection: any) => {
        connection.commit(() => {
            connection.release();
        });
    });
}        