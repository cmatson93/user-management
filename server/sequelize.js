const Sequelize = require('sequelize');
const UserModel = require('./models/User');

const sequelize = new Sequelize('usersApp', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql', 
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: true })
.then(() => {
    console.log('Database and tables created here!')
});

module.exports = { User }