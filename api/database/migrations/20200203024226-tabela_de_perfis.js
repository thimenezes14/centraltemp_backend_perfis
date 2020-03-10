'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('ct_perfis', { 
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        sexo: {
          type: Sequelize.CHAR(1),
          allowNull: false,
        },
        data_nasc: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        senha: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        avatar: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      }).then(() => queryInterface.addConstraint('ct_perfis', ['sexo'], {
        type: 'check',
        where: {
           sexo: ['M', 'F']
        }
      }));
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('ct_perfis');
  }
};