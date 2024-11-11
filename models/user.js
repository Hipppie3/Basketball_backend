import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
 username: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
 },
 password: {
  type: DataTypes.STRING,
  allowNull: false,
 },
}, {
 timestamps: true,
});

//beforeCreate is a hook, runs a code right before a new record is saved
User.beforeCreate(async (user) => { 
 const salt = await bcrypt.genSalt(10); // Generates a unique string added to the password before hashing to make it more secure
 user.password = await bcrypt.hash(user.password, salt);
});//replaces the plaintext password witht the hashed version 

User.prototype.verifyPassword = async function (inputPassword) {
 return bcrypt.compare(inputPassword, this.password);
};


export default User;