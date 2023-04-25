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
router.post('/cadastrarusuario', usuarioController.cadastrar);

//rotas put


//rotas delete



export default router;