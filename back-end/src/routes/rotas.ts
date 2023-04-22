import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import * as usuarioController from '../controllers/usuarioController';

const router = Router();


//rotas get

//rotas post
router.post('/login', loginController.logar);
router.post('/validartoken', loginController.validarToken);
router.post('/validarformulario', usuarioController.validarFormulario);
router.post('/cadastrarusuario', usuarioController.cadastrar);

//rotas put


//rotas delete



export default router;