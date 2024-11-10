import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Player = sequelize.define('Player', {
 firstName: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 lastName: {
  type: DataTypes.STRING,
  allowNull: false,
 },
}, {
 timestamps: true,
 underscored: true,
});

export default Player;