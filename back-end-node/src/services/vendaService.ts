const pool = require('../db/conn');
import { Venda } from '../models/Venda';
import { retornaIdLogin } from './loginServices';


export const gravarVenda = async (produtos: Array<any>, token: string) => {
    let resultado: boolean = true;
    const id = await retornaIdLogin(token);
    const sql = 'insert into vendas(id_usuario, data_venda, total) values(?,?,?)';
    const values = [id, new Date(), produtos.reduce((acumulador, item) => acumulador + item.preco, 0)];
    const promisePool = pool.promise();
    let valor: Array<any> = await promisePool.query(sql, values, (err: Error, data: any) => {
        if (err) {
            resultado = false;
            rollback();
        }
    });
    try {
        const id_venda = valor[0].insertId
        resultado = await gravarListProdutos(produtos, id_venda);
    } catch (e) {
        resultado = false;
    }

    if (resultado) {
        commit();
    }
    return resultado;
}

export const gravarListProdutos = async (produtos: Array<any>, id_venda: number) => {
    const sql = 'insert into lista_venda(id_venda, id_produto, quantidade) values(?,?,?)';
    await Promise.all(produtos.map(async (produto: any) => {
        const values = [id_venda, produto.id, produto.quantidade];
        const promisePool = pool.promise();
        let valor: Array<any> = await promisePool.query(sql, values, (err: Error, data: any) => {
            if (err) {
                rollback();
                return false;
            }
        });
    }));

    return true;
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