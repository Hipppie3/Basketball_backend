import User from '../models/user.js';

export const addUser = async (req, res) => {
 const { username, password } = req.body;
 try {
  const newUser = await User.create({username, password});
  res.status(201).json(newUser);
 } catch (error) {
  console.error('Error creating user:', error);
  res.status(500).json({error: "Error creating user"});
 }
};

export const getAllUsers = async (req, res) => {
 const { username, password } = req.body;
 try {
  const users = await User.findAll();
  res.status(200).json(users);
 } catch (error) {
  console.error('Error getting users:', error);
  res.status(500).json({error: "Error getting users"});
 }
};

export const getUser = async (req, res) => {
 const {id} = req.params;
 try {
  const user = await User.findByPk(id);
  if(!user) {
   return res.status(404).json({error: "User not found"});
  }
  res.status(200).json(user);
 } catch (error) {
  console.error('Error retrieving user:', error);
  res.status(500).json({error: "Error retrieving user"});
 }
};

export const deleteUser = async (req, res) => {
 const {id} = req.params;
 try {
  const result = await User.destroy({
   where: {id}
  });
  if (result) {
   res.status(200).json({ message: "User deleted successfully"})
  } else {
   res.status(404).json({message: "User not found"})
  }}
  catch (error) {
   console.error('Error deleting user:', error);
   res.status(500).json({error: "Error deleting user"})
  }
};
