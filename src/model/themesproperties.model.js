const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection');

const ThemesPropertiesModel = sequelize.define('ThemesProperties', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  themes_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  property_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  property_value: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'themes_properties',
  timestamps: false
});

module.exports = {
  ThemesPropertiesModel
};
