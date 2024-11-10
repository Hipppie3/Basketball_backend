import { Sequelize } from 'sequelize';
import config from './config.js';

const {database, username, password} = config.development;

const sequelize = new Sequelize(
 database,
 username,
 password,
 {
  host: config.development.host,
  dialect: config.development.dialect,
  logging: false,
 }
);

export default sequelize;