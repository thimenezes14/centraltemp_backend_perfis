const {Model, DataTypes} = require('sequelize');

class Perfil extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            nome: DataTypes.STRING,
            sexo: DataTypes.CHAR,
            data_nasc: DataTypes.DATEONLY,
            senha: DataTypes.STRING,
            avatar: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'ct_perfis',
        })
    }

    static associate(models) {

    }
}

module.exports = Perfil;