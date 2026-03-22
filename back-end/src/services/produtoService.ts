const pool = require('../db/conn');
import { Produto } from '../models/Produto';

export const cadastrarProduto = async (produto: Produto) => {
    const sql = 'insert into produtos(nome, preco_custo, preco_venda, quantidade, medida, categoria) values(?,?,?,?,?,?)';
    const values = [produto.nome, produto.precoCusto, produto.precoVenda, produto.quantidade, produto.medida, produto.categoria];
    const promisePool = pool.promise();

    try {
        await promisePool.query(sql, values);
        commit();
        return true;
    } catch (err) {
        console.error(err);
        rollback();
        return false;
    }
}

export const listarProdutos = async (): Promise<Array<Produto>> => {
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

export const buscarProdutoPorId = async (id: number): Promise<any> => {
    const sql = `select * from produtos where id = ? LIMIT 1`;
    const values = [id];
    const promisePool = pool.promise();

    try {
        const [rows]: any = await promisePool.query(sql, values);
        return rows[0] ?? null;
    } catch (err) {
        console.error(err);
        throw new Error('Erro ao buscar produto por ID');
    }
}

export const buscarProdutosPorNome = async (nome: string): Promise<Array<Produto>> => {
    const sql = `select * from produtos where nome like ?`;
    const parametro = nome + '%';
    const values = [parametro];
    const promisePool = pool.promise();

    try {
        const [rows]: [Array<Produto>] = await promisePool.query(sql, values);
        return rows;
    } catch (err) {
        console.error(err);
        rollback();
        return [];
    } finally {
        commit();
    }
}

export const atualizarProduto = async (produto: Produto) => {
    const sql = `update produtos set nome = ?, preco_custo = ?, preco_venda = ?, quantidade = ?, medida = ?, categoria = ? where id = ?`;
    const values = [produto.nome, produto.precoCusto, produto.precoVenda, produto.quantidade, produto.medida, produto.categoria, produto.id];
    const promisePool = pool.promise();

    try {
        await promisePool.query(sql, values);
        return true;
    } catch (err) {
        console.error(err);
        rollback();
        return false;
    } finally {
        commit();
    }
}

export const atualizarQuantidadeProduto = async (id: number, quantidade: number) => {
    const sql = `update produtos set quantidade = ? where id = ?`;
    const values = [quantidade, id];
    const promisePool = pool.promise();

    try {
        await promisePool.query(sql, values);
        return true;
    } catch (err) {
        console.error(err);
        rollback();
        return false;
    } finally {
        commit();
    }
}

export const excluirProduto = async (id: number) => {
    try {
        const sql = `delete from produtos where id = ?`;
        const values = [id];
        const promisePool = pool.promise();
        await promisePool.query(sql, values);
        commit();
        return true;
    } catch (err) {
        rollback();
        console.error(err);
        throw new Error('Erro ao excluir produto');
    }
}

export const atualizarAdicaoProdutos = async (produtos: Array<any>) => {
    try {
        await Promise.all(produtos.map(async (produto: any) => {
            const id = Number(produto?.id);
            const quantidade = Number(produto?.quantidade);

            if (!Number.isInteger(id) || !Number.isFinite(quantidade) || quantidade <= 0) {
                throw new Error('Dados inválidos para adição de estoque');
            }

            const elemento = await buscarProdutoPorId(id);

            if (!elemento) {
                throw new Error('Produto não encontrado');
            }

            const novaQuantidade = Number(elemento.quantidade) + quantidade;
            const atualizado = await atualizarQuantidadeProduto(id, novaQuantidade);

            if (!atualizado) {
                throw new Error('Erro ao adicionar quantidade ao estoque');
            }
        }));

        return true;
    } catch (err) {
        rollback();
        console.error(err);
        throw err;
    }
}

export const atualizarRemocaoProdutos = async (produtos: Array<any>) => {
    try {
        await Promise.all(produtos.map(async (produto: any) => {
            const id = Number(produto?.id);
            const quantidade = Number(produto?.quantidade);

            if (!Number.isInteger(id) || !Number.isFinite(quantidade) || quantidade <= 0) {
                throw new Error('Dados inválidos para remoção de estoque');
            }

            const elemento = await buscarProdutoPorId(id);

            if (!elemento) {
                throw new Error('Produto não encontrado');
            }

            const novaQuantidade = Number(elemento.quantidade) - quantidade;

            if (novaQuantidade < 0) {
                throw new Error('Quantidade insuficiente em estoque');
            }

            const atualizado = await atualizarQuantidadeProduto(id, novaQuantidade);

            if (!atualizado) {
                throw new Error('Erro ao remover quantidade do estoque');
            }
        }));

        return true;
    } catch (err) {
        rollback();
        console.error(err);
        throw err;
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
