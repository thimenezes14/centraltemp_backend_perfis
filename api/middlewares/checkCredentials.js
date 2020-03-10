const Perfil = require('../models/Perfil');
const bcrypt = require('bcrypt-nodejs');

module.exports = (req, res, next) => {
    const token = res.locals.token.id;
    const { senha } = req.body;

    if (!token || !senha)
        return res.status(400).json({err: "Forneça todas as credenciais para acesso! " });

    Perfil.findOne({
        attributes: ['id', 'senha'],
        where: {id: token}
    })
        .then((perfil) => {
            
            bcrypt.compare(senha, perfil.senha, (err, isMatch) => {
                if(err || !isMatch)
                    return res.status(401).json({err: "Credenciais incorretas " });

                next();
            });
        })
        .catch((err) => { console.log(err); 
            return res.status(500).json({err: "Erro ao se autenticar! " });
        });

}