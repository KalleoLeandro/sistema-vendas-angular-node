const pool = require('../db/conn');
import { Produto } from '../models/Produto';

export const cadastrarProduto = async (produto:Produto) =>{

    let resultado: boolean = true;
    const sql = 'insert into produtos(nome, preco_custo, preco_venda, quantidade, medida, categoria) values(?,?,?,?,?,?)';
    const values = [produto.nome, produto.precoCusto, produto.precoVenda, produto.quantidade, produto.medida, produto.categoria];
    const promisePool = pool.promise();
    let valor: Array<any>  = await promisePool.query(sql, values, (err: Error, data: any) => {
        if (err) {
            resultado = false;
            rollback();
        }
    });
    commit();
    return resultado;
}

export const listarProdutos = async  ():Promise<Array<Produto>> => {
    const sql = `select * from produtos`;
    const promisePool = pool.promise();
    try {
        const [rows]: [Array<Produto>] = await promisePool.query(sql);
        console.log(rows);
        return rows;
    } catch (err) {
        console.error(err);
        return [];
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