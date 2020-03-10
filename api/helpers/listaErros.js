const {check} = require('express-validator');

module.exports.cadastro = [
    check('nome')
        .matches(/^[a-zà-úA-ZÀ-Ú]{1}[a-zà-ú A-ZÀ-Ú \-]{1,11}[a-zà-úA-ZÀ-Ú]{0,1}$/)
        .withMessage('Forneça um nome de 2 a 13 caracteres, com ou sem acentos e traços, sem a inclusão de outros caracteres especiais.'),

    check('sexo')
        .not().isEmpty()
        .withMessage('Você deve selecionar um sexo. '),

    check('data_nasc')
        .matches(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/)
        .withMessage('Você deve fornecer uma data de nascimento válida. '),

    check('senha')
        .matches(/^[0-9]{4}$/)
        .withMessage('Por favor, forneça uma senha numérica de 4 dígitos. '),

    check('senha_conf').custom((senhaConf, { req }) => {
        if (senhaConf !== req.body.senha) {
            throw new Error('As senhas digitadas nos campos não conferem. Por favor, verifique e tente novamente.');
        }
        return true;
    })
]

module.exports.atualizacao = [
    check('nome')
        .matches(/^[a-zà-úA-ZÀ-Ú]{1}[a-zà-ú A-ZÀ-Ú \-]{1,11}[a-zà-úA-ZÀ-Ú]{0,1}$/)
        .withMessage('Forneça um nome de 2 a 13 caracteres, com ou sem acentos e traços, sem a inclusão de outros caracteres especiais.')
]