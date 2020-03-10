const Sequelize = require('sequelize');
const db = require('../config/database');

const Perfil = require('../models/Perfil');
const conn = new Sequelize(db);

Perfil.init(conn);

module.exports = conn;