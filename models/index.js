const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");
const sequelize = new Sequelize(config.development);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Categoria = require("./categoria")(sequelize, DataTypes);
db.Aluno = require("./aluno")(sequelize, DataTypes);
db.Professor = require("./professor")(sequelize, DataTypes);
//db.User = require("./user")(sequelize, DataTypes);

// Configurações de associações
Object.keys(db).forEach((modelName) => {
if (db[modelName].associate) {
db[modelName].associate(db);
}
});

module.exports = db;