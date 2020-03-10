const express = require('express');
const perfilController = require('../../controllers/perfis');

const validacaoCadastro = require('../../helpers/listaErros');
const checkToken = require('../../middlewares/checkToken');
//const checkCredentials = require('../../middlewares/checkCredentials');
const countProfiles = require('../../middlewares/countProfiles');

const router = express.Router();
const pathName = '/perfis';

router.get(`${pathName}`, (req, res) => res.status(200).send("Serviço de Perfis OK"));
router.get(`${pathName}/listar`, perfilController.listar);
router.get(`${pathName}/:id/detalhes`, checkToken, perfilController.detalhar);
router.post(`${pathName}/autenticar`, perfilController.autenticar);
router.post(`${pathName}/cadastrar`, validacaoCadastro.cadastro, countProfiles, perfilController.salvar);
router.put(`${pathName}/:id/atualizar`, checkToken, validacaoCadastro.atualizacao, perfilController.atualizar);
router.delete(`${pathName}/:id/excluir`, checkToken, perfilController.excluir);
router.get(`${pathName}/verificar`, checkToken, perfilController.verificarToken);

module.exports = router;