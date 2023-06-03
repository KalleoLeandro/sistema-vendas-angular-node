import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import * as usuarioController from '../controllers/usuarioController';

const router = Router();


//rotas get

router.get('/listausuarios', usuarioController.listaUsuarios);
router.get('/listausuarioporid', usuarioController.listarUsuarioPorId);

//rotas post
router.post('/login', loginController.logar);
router.post('/validartoken', loginController.validaToken);
router.post('/userportoken', loginController.userPorToken);
router.post('/validarformulario', usuarioController.validarFormulario);
router.post('/cadastrarusuario', usuarioController.cadastrarUser);


//rotas put
router.put('/atualizarusuario', usuarioController.atualizarUser);


//rotas delete
router.delete('/excluirusuario/:id', usuarioController.excluirUser);    



export default router;