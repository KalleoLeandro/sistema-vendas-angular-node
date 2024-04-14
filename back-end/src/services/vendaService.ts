const pool = require('../db/conn');
import { retornaIdLogin } from './loginServices';


export const gravarVenda = async (produtos: Array<any>, token: string) => {
    try {
        const id = await retornaIdLogin(token);
        const total = produtos.reduce((acumulador, item) => acumulador + item.preco, 0);
        const sql = 'insert into vendas(id_usuario, data_venda, total) values(?,?,?)';
        const values = [id, new Date(), total];
        const promisePool = pool.promise();
        const [result] = await promisePool.query(sql, values);
        const id_venda = result.insertId;
        await gravarListProdutos(produtos, id_venda);
        commit();
        return true;
    } catch (error) {
        console.error(error);
        rollback();
        return false;
    }
}

export const gravarListProdutos = async (produtos: Array<any>, id_venda: number) => {
    try {
        const sql = 'insert into lista_venda(id_venda, id_produto, quantidade) values(?,?,?)';
        const promisePool = pool.promise();
        await Promise.all(produtos.map(async (produto: any) => {
            const values = [id_venda, produto.id, produto.quantidade];
            await promisePool.query(sql, values);
        }));
        return true;
    } catch (error) {
        console.error(error);
        rollback();
        return false;
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