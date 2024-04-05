import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import * as usuarioController from '../controllers/usuarioController';
import * as produtoController from '../controllers/produtoController';
import * as vendaController from '../controllers/vendaController';
import * as middleware from '../middlewares/middleware';

const router = Router();


//rotas get
router.get('/listausuarios', middleware.verificaTokenValido, usuarioController.listaUsuarios);
router.get('/listausuarioporid', middleware.verificaTokenValido, usuarioController.listarUsuarioPorId);
router.get('/listaprodutos', middleware.verificaTokenValido, produtoController.listaProdutos);
router.get('/listaprodutoporid', middleware.verificaTokenValido, produtoController.listarProductPorId);
router.get('/listaprodutopornome/:nome', middleware.verificaTokenValido, produtoController.listaProdutosPorNome);

//rotas post
router.post('/login', loginController.logar);
router.post('/validartoken', loginController.validaToken);
router.post('/userportoken', middleware.verificaTokenValido, loginController.userPorToken);
router.post('/validarformulario', middleware.verificaTokenValido, usuarioController.validarFormulario);
router.post('/cadastrarusuario', middleware.verificaTokenValido, usuarioController.cadastrarUser);
router.post('/cadastrarproduto', middleware.verificaTokenValido, produtoController.cadastrarProdutos);
router.post('/adicionarprodutos', middleware.verificaTokenValido, produtoController.adicionarProdutos);
router.post('/removerprodutos', middleware.verificaTokenValido, produtoController.removerProdutos);
router.post('/efetuarvenda', middleware.verificaTokenValido, vendaController.efetuarVenda);


//rotas put
router.put('/atualizarusuario', usuarioController.atualizarUser);


//rotas delete
router.delete('/excluirusuario/:id', usuarioController.excluirUser);    
router.delete('/excluirproduto/:id', produtoController.excluirProduct);



export default router;