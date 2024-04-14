const pool = require('../db/conn');
import { Produto } from '../models/Produto';

export const cadastrarProduto = async (produto:Produto) =>{    
    const sql = 'insert into produtos(nome, preco_custo, preco_venda, quantidade, medida, categoria) values(?,?,?,?,?,?)';
    const values = [produto.nome, produto.precoCusto, produto.precoVenda, produto.quantidade, produto.medida, produto.categoria];
    const promisePool = pool.promise();
    try {
        await promisePool.query(sql, values);
        commit(); // Confirma a transação se a inserção for bem-sucedida
        return true;
    } catch (err) {
        console.error(err);
        rollback(); // Reverte a transação em caso de erro
        return false;
    }
}

export const listarProdutos = async  ():Promise<Array<Produto>> => {
    const sql = `select * from produtos`;
    const promisePool = pool.promise();
    try {
        const [rows]: [Array<Produto>] = await promisePool.query(sql);        
        return rows;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const buscarProdutoPorId = async (id:number): Promise<Produto> =>{
    const sql = `select * from produtos where id = ? LIMIT 1`;
    const values = [id];
    const promisePool = pool.promise();
    try {
        //const produto: any = await promisePool.query(sql, values);
        const [rows]: [Produto] = await promisePool.query(sql, values);          
        return rows;
    } catch (err) {        
        console.error(err);
        throw new Error;
    }
}

export const buscarProdutosPorNome = async(nome:string):Promise<Array<Produto>> =>{
    const sql = `select * from produtos where nome like ?`;
    const parametro = nome + '%';
    const values = [parametro];
    const promisePool = pool.promise();
    try {
        const [rows]: [Array<Produto>] = await promisePool.query(sql, values);        
        return rows;
    } catch (err) {
        console.error(err);
        rollback(); // Se você precisa executar um rollback aqui
        return [];
    } finally {
        commit(); // Independente do resultado, o commit é executado no bloco finally
    }
}

export const atualizarProduto = async (produto:Produto) =>{
    const sql = `update produtos set nome = ?, preco_custo = ?, preco_venda = ?, quantidade = ?, medida=?, categoria=? where id = ?`;
    const values = [produto.nome, produto.precoCusto, produto.precoVenda, produto.quantidade, produto.medida, produto.categoria, produto.id];
    const promisePool = pool.promise();
    try {
        await promisePool.query(sql, values);
        return true;
    } catch (err) {
        console.error(err);
        rollback(); // Se você precisa executar um rollback aqui
        return false;
    } finally {
        commit(); // Independente do resultado, o commit é executado no bloco finally
    }
}

export const excluirProduto = async (id:number)=>{
    try {        
        const sql = `delete from produtos where id = ?`
        const values = [id];
        const promisePool = pool.promise();
        await promisePool.query(sql, values);
        commit();        
        return true;
    }
    catch (err) {
        rollback();
        console.error(err);
        throw new Error;
    }
}

export const atualizarAdicaoProdutos = async(produtos:Array<any>)=>{
    let produtosAAlterar:any [] = [];
    await Promise.all(produtos.map(async (produto: any) => {
        let elemento: any = await buscarProdutoPorId(produto.id);
        elemento.quantidade +=  produto.quantidade;        
        produtosAAlterar.push(elemento);
    }));    
    try{
        await Promise.all(produtosAAlterar.map(async (produto: any) => {
            const produtoAAlterar:Produto = {
                id: produto.id,
                nome: produto.nome,
                precoCusto: produto.preco_custo,
                precoVenda: produto.preco_venda,
                quantidade: produto.quantidade,
                medida: produto.medida,
                categoria: produto.categoria
            }            
            await atualizarProduto(produtoAAlterar);
        }));
        commit();
        return true;
    }catch(err){
        rollback();
        console.error(err);
        throw new Error;
    }
}

export const atualizarRemocaoProdutos = async(produtos:Array<any>)=>{
    let produtosAAlterar:any [] = [];
    await Promise.all(produtos.map(async (produto: any) => {
        let elemento: any = await buscarProdutoPorId(produto.id);              
        elemento.quantidade -=  produto.quantidade;
        if(elemento.quantidade < 0){
            return false;
        }
        produtosAAlterar.push(elemento);
    }));      
    try{
        await Promise.all(produtosAAlterar.map(async (produto: any) => {
            const produtoAAlterar:Produto = {
                id: produto.id,
                nome: produto.nome,
                precoCusto: produto.preco_custo,
                precoVenda: produto.preco_venda,
                quantidade: produto.quantidade,
                medida: produto.medida,
                categoria: produto.categoria
            }
            await atualizarProduto(produtoAAlterar);
        }));
        commit();
        return true;
    }catch(err){
        rollback();
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