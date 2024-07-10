const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'postgres',
                                process.env.DB_PASSWORD || '',
                                {
                                  host: process.env.DB_HOST || 'localhost',
                                  port: process.env.DB_PORT || 5432,
                                  dialect: 'postgres',
                                });

// models
const Note = sequelize.define('note', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tasks: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  }
});

// create tables if not exist
(async() => {
  await sequelize.sync();
})();

module.exports = {
  sequelize: sequelize,
  Note: Note
};
