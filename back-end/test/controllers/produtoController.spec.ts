import * as produtoController from '../../src/controllers/produtoController';
import express, { Request, Response } from 'express';
import { atualizarAdicaoProdutos, atualizarProduto, atualizarRemocaoProdutos, buscarProdutoPorId, buscarProdutosPorNome, cadastrarProduto, excluirProduto, listarProdutos } from '../../src/services/produtoService';

jest.mock('../../src/services/produtoService', () => ({
    cadastrarProduto: jest.fn(),
    listarProdutos: jest.fn(),
    buscarProdutoPorId: jest.fn(),
    buscarProdutosPorNome: jest.fn(),
    atualizarProduto: jest.fn(),
    excluirProduto: jest.fn(),
    adicionarProdutos: jest.fn(),
    atualizarAdicaoProdutos: jest.fn(),
    atualizarRemocaoProdutos: jest.fn()    
}));

describe('Testes do método cadastrarProdutos da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste cadastrarProdutos retorna 201', async () => {

        const req  = {
            body: {
                produto: {}
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (cadastrarProduto as jest.Mock).mockImplementation(() => Promise.resolve(true));

        await produtoController.cadastrarProdutos(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(201);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith("Produto cadastrado com sucesso!");
    })

    it('teste cadastrarProdutos retorna 500', async () => {

        const req  = {
            body: {
                produto: {}
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (cadastrarProduto as jest.Mock).mockImplementation(() => Promise.resolve(false));

        await produtoController.cadastrarProdutos(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith("Erro ao cadastrar produto!");
    })
});

describe('Testes do método listaProdutos da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste listaProdutos retorna 200', async () => {

        const req  = {

        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (listarProdutos as jest.Mock).mockImplementation(() => Promise.resolve([{id: 1, nome: 'teste'}]));

        await produtoController.listaProdutos(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith([{id: 1, nome: 'teste'}]);
    })

    it('teste listaProdutos retorna 500', async () => {

        const req  = {
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (listarProdutos as jest.Mock).mockImplementation(() => Promise.reject([]));

        await produtoController.listaProdutos(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    })
});

describe('Testes do método listarProductPorId da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste listarProductPorId retorna 200', async () => {

        const req  = {
            query: {
                id: 1
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (buscarProdutoPorId as jest.Mock).mockImplementation(() => Promise.resolve([{id: 1, nome: 'teste'}]));

        await produtoController.listarProductPorId(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith([{id: 1, nome: 'teste'}]);
    })

    it('teste listarProductPorId retorna 200 mas vazio', async () => {

        const req  = {
            query: {
                id: 1
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (buscarProdutoPorId as jest.Mock).mockImplementation(() => Promise.resolve(null));

        await produtoController.listarProductPorId(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({ message: "Não há produtos com o ID selecionado!" });
    })

    it('teste listarProductPorId retorna 500', async () => {

        const req  = {
            query: {
                id: 1
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (buscarProdutoPorId as jest.Mock).mockImplementation(() => Promise.reject());

        await produtoController.listarProductPorId(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    })
});

describe('Testes do método listaProdutosPorNome da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste listaProdutosPorNome retorna 200', async () => {

        const req  = {
            params: {
                nome: 'teste'
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (buscarProdutosPorNome as jest.Mock).mockImplementation(() => Promise.resolve([{id: 1, nome: 'teste'}]));

        await produtoController.listaProdutosPorNome(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith([{id: 1, nome: 'teste'}]);
    })

    it('teste listaProdutosPorNome retorna 500', async () => {

        const req  = {
            params: {
                nome: 'teste'
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (buscarProdutosPorNome as jest.Mock).mockImplementation(() => Promise.reject());

        await produtoController.listaProdutosPorNome(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    })
});


describe('Testes do método atualizarProduct da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste atualizarProduct retorna 200', async () => {

        const req  = {
            body: {
                product: {}
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (atualizarProduto as jest.Mock).mockImplementation(() => Promise.resolve(true));

        await produtoController.atualizarProduct(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith("Produto atualizado com sucesso!");
    })

    it('teste atualizarProduct retorna 500', async () => {

        const req  = {
            body: {
                product: {}
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (atualizarProduto as jest.Mock).mockImplementation(() => Promise.resolve(false));

        await produtoController.atualizarProduct(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    })

    it('teste atualizarProduct retorna 500 devido catch', async () => {

        const req  = {
            body: {
                product: {}
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (atualizarProduto as jest.Mock).mockImplementation(() => Promise.reject());

        await produtoController.atualizarProduct(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    })
});

describe('Testes do método excluirProduct da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste excluirProduct retorna 204', async () => {

        const req  = {
            params: {
                id: 1
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (excluirProduto as jest.Mock).mockImplementation(() => Promise.resolve(true));

        await produtoController.excluirProduct(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(204);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith("Produto excluído com sucesso!");
    })

    it('teste excluirProduct retorna 500', async () => {

        const req  = {
            params: {
                id: 1
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (excluirProduto as jest.Mock).mockImplementation(() => Promise.resolve(false));

        await produtoController.excluirProduct(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    })
});

describe('Testes do método adicionarProdutos da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste adicionarProdutos retorna 204', async () => {

        const req  = {
            body: {
                produtos: [
                    {}
                ]
                
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (atualizarAdicaoProdutos as jest.Mock).mockImplementation(() => Promise.resolve(true));

        await produtoController.adicionarProdutos(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(204);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith("Produto(s) adicionado(s) com sucesso!");
    })

    it('teste excluirProduct retorna 500', async () => {

        const req  = {
            body: {
                produtos: [
                    {}
                ]
                
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (atualizarAdicaoProdutos as jest.Mock).mockImplementation(() => Promise.resolve(false));

        await produtoController.adicionarProdutos(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    })
});

describe('Testes do método removerProdutos da controller', () => {
    beforeEach(() => {
        // Limpa o mock antes de cada teste
        jest.clearAllMocks();
    });

    it('teste removerProdutos retorna 204', async () => {

        const req  = {
            body: {
                produtos: [
                    {}
                ]
                
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (atualizarRemocaoProdutos as jest.Mock).mockImplementation(() => Promise.resolve(true));

        await produtoController.removerProdutos(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(204);

        // Verifica se a função json foi chamada com o token
        expect(res.json).toHaveBeenCalledWith("Produto(s) removido(s) com sucesso!");
    })

    it('teste removerProdutos retorna 500', async () => {

        const req  = {
            body: {
                produtos: [
                    {}
                ]
                
            }
        } as any as Request
        
        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(), // Retorna o próprio res para encadeamento
            json: jest.fn(), // Mock da função json
            end: jest.fn(), // Mock da função end
        };

        (atualizarRemocaoProdutos as jest.Mock).mockImplementation(() => Promise.resolve(false));

        await produtoController.removerProdutos(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    })
});






