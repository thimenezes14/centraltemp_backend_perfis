const Perfil = require('../models/Perfil');
const MAX_PROFILES = 5;

module.exports = (req, res, next) => {

    Perfil.count()
        .then((quantidadePerfis) => {
            if(quantidadePerfis < MAX_PROFILES)
                next();
            else
                return res.status(403).json({err: "O número máximo de perfis já foi atingido! "});
        })
        .catch((err) => {
            return res.status(500).json({err: "Não foi possível contar os perfis! " });
        });

}