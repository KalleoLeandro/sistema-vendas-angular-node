const pool = require('../db/conn');

const MESES = [
    'Janeiro',
    'Fevereiro',
    'Marco',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
];

export const buscarDadosDashboard = async () => {
    const promisePool = pool.promise();

    const sqlLucroMes = `
        select coalesce(sum(total), 0) as total
        from vendas
        where year(data_venda) = year(curdate())
          and month(data_venda) = month(curdate())
    `;

    const sqlLucroAno = `
        select coalesce(sum(total), 0) as total
        from vendas
        where year(data_venda) = year(curdate())
    `;

    const sqlProdutosEmFalta = `
        select count(*) as total
        from produtos
        where quantidade <= 10
    `;

    const sqlProdutoMaisVendido = `
        select p.nome, coalesce(sum(lv.quantidade), 0) as total_vendido
        from lista_venda lv
        inner join produtos p on p.id = lv.id_produto
        group by p.id, p.nome
        order by total_vendido desc, p.nome asc
        limit 1
    `;

    const sqlVendasPorMes = `
        select month(data_venda) as mes, coalesce(sum(total), 0) as total
        from vendas
        where year(data_venda) = year(curdate())
        group by month(data_venda)
        order by month(data_venda)
    `;

    const sqlEstoquePorCategoria = `
        select categoria, coalesce(sum(quantidade), 0) as total
        from produtos
        group by categoria
        order by categoria
    `;

    try {
        const [
            [lucroMesRows],
            [lucroAnoRows],
            [produtosEmFaltaRows],
            [produtoMaisVendidoRows],
            [vendasPorMesRows],
            [estoquePorCategoriaRows]
        ]: any = await Promise.all([
            promisePool.query(sqlLucroMes),
            promisePool.query(sqlLucroAno),
            promisePool.query(sqlProdutosEmFalta),
            promisePool.query(sqlProdutoMaisVendido),
            promisePool.query(sqlVendasPorMes),
            promisePool.query(sqlEstoquePorCategoria)
        ]);

        const mapaVendas = new Map<number, number>();
        vendasPorMesRows.forEach((item: any) => {
            mapaVendas.set(Number(item.mes), Number(item.total));
        });

        const vendasPorMes = MESES.map((label, index) => ({
            label,
            valor: mapaVendas.get(index + 1) || 0
        }));

        const estoquePorCategoria = estoquePorCategoriaRows.map((item: any) => ({
            label: item.categoria,
            valor: Number(item.total)
        }));

        return {
            lucroMes: Number(lucroMesRows[0]?.total || 0),
            lucroAnual: Number(lucroAnoRows[0]?.total || 0),
            produtosEmFalta: Number(produtosEmFaltaRows[0]?.total || 0),
            produtoMaisVendido: produtoMaisVendidoRows[0]?.nome || 'Nenhum',
            vendasPorMes,
            estoquePorCategoria
        };
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao carregar dados do dashboard');
    }
}
