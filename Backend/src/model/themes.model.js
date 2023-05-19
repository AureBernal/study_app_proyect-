const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const ThemesModel = sequelize.define('Themes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  create_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  keywords: {
    type: DataTypes.STRING,
    allowNull: true
  },
  owner_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'themes',
  timestamps: false
});

module.exports = {
  ThemesModel
};