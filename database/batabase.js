const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'joao24056797', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;