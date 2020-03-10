const Perfil = require('../models/Perfil');
const { validationResult } = require('express-validator');
const gerarHash = require('../helpers/obterHash');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../.env');
const bcrypt = require('bcrypt-nodejs');
const sequelize = require('sequelize');

module.exports = {
    listar(req, res) {
        Perfil.findAll({
            attributes: ['id', 'nome', 'sexo', [sequelize.fn('to_char', sequelize.col('data_nasc'), 'dd/mm/YYYY'), 'data_nasc'], 'avatar'],
            order: [
                ['nome', 'ASC']
            ]
        })
            .then((listaPerfis) => { return res.status(200).json(listaPerfis) })
            .catch((error) => { return res.status(500).json({ err: "Erro ao tentar listar perfis. " + error}) });

    },

    detalhar(req, res) {
        const token = res.locals.token.id;
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ err: "Necessário ID para detalhamento." });

        if (id !== token)
            return res.status(401).json({ err: "Você não tem autorização para esta ação. " });

        Perfil.findOne({
            attributes: ['id', 'nome', 'sexo', [sequelize.fn('to_char', sequelize.col('data_nasc'), 'dd/mm/YYYY'), 'data_nasc'], 'avatar'],
            where: { id }
        })
            .then((perfil) => { return res.status(200).json(perfil) })
            .catch(() => { return res.status(500).json({ err: "Erro ao tentar detalhar perfil. " }) })

    },

    autenticar(req, res) {
        const { id, senha } = req.body;

        if (!id || !senha)
            return res.status(400).json({ err: "Forneça todas as credenciais para acesso! " });

        Perfil.findOne({
            attributes: ['id', 'senha', 'nome', 'sexo', [sequelize.fn('to_char', sequelize.col('data_nasc'), 'dd/mm/YYYY'), 'data_nasc']],
            where: { id }
        })
            .then((perfil) => {

                bcrypt.compare(senha, perfil.senha, (err, isMatch) => {
                    if (err || !isMatch)
                        return res.status(401).json({ err: "Credenciais incorretas" });

                    const token = jwt.sign({
                        id: perfil.id
                    },
                        jwtSecret,
                        {
                            expiresIn: "10m"
                        }
                    );

                    return res.status(200).json({token});
                });
            })
            .catch((err) => { console.log(err); return res.status(500).json({ err: "Erro ao tentar autenticar. " }) })

    },

    salvar(req, res) {

        const { nome, sexo, data_nasc, senha } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ err: errors.array().map(item => { return item.msg }) });
        }

        gerarHash(senha, hash => {
            Perfil.create({ nome, sexo, data_nasc, senha: hash})
                .then(() => { return res.status(201).json({}) })
                .catch((error) => { return res.status(500).json({ err: "Erro ao tentar salvar perfil.", error }) })
        });
    },

    atualizar(req, res) {
        const token = res.locals.token.id;
        console.log(token);

        const { id } = req.params;

        if (!id)
            return res.status(400).json({ err: "Necessário ID para alteração." });

        if (id !== token)
            return res.status(403).json({ err: "Você não tem autorização para esta ação. " });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ err: errors.array().map(item => { return item.msg }) });
        }

        if(req.body.novaSenha) {
            if(!RegExp(/^[0-9]{4}$/).test(req.body.novaSenha)) {
                return res.status(422).json({err: ["Por favor, forneça uma senha numérica de 4 dígitos."]});
            }
        }

        const campos = {
            nome: req.body.nome,
            avatar: req.body.avatar
        };

        if (!req.body.novaSenha) {
            Perfil.update(campos, { where: { id } })
                .then(() => { return res.status(200).json({}) })
                .catch(() => { return res.status(500).json({ err: "Erro ao tentar atualizar perfil." }) })
        } else {
            gerarHash(req.body.novaSenha, hash => {
                Perfil.update({ nome: campos.nome, avatar: campos.avatar, senha: hash }, { where: { id } })
                    .then(() => { return res.status(200).json({}) })
                    .catch(() => { return res.status(500).json({ err: "Erro ao tentar salvar perfil." }) })
            });
        }
    },

    excluir(req, res) {
        const token = res.locals.token.id;
        const { id } = req.params;

        if (!id)
            return res.status(400).json({ err: "Necessário ID para exclusão." });

        if (id !== token)
            return res.status(403).json({ err: "Você não tem autorização para esta ação. " });

        Perfil.destroy({ where: { id } })
            .then(() => { return res.status(202).json({}) })
            .catch(() => { return res.status(500).json({ err: "Erro ao tentar excluir perfil. " }) })

    },

    verificarToken(req, res) {
        res.status(200).send();
    }
};