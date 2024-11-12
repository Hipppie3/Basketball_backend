import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
  const existingUser = await User.findOne({ where: { username }});
  if (existingUser) {
    return res.status(403).json({message: "Username already registered"});
  };

  const newUser = await User.create({ username, password });
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: '1hr'}
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000
  });

  res.status(200).json({ message: "User registered successfully", username: newUser.username});
  } catch (error) {
  res.status(500).json({ error: "Registering failed"});
  }
};



export const loginUser = async (req, res) => {
  const {username, password} = req.body;

  try{
  const user = await User.findOne({ where: {username}});
  if (!user) {
    return res.status(404).json({ message: "User not found"})
  };

  const isMatched = await user.verifyPassword(password);
  if (!isMatched) {
    return res.status(404).json({ message: "Incorrect password"})
  };

  const token = jwt.sign(
    { id: user.id, username: user.username},
    process.env.JWT_SECRET,
    { expiresIn: '1hr'}
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 360000
  });

  res.status(200).json({ message: 'Login successful', username: user.username});
  } catch (error) {
  res.status(500).json({ message: 'Login failed' });
  }
};


export const getAllUsers = async (req, res) => {
  try{
  const users = await User.findAll();
  res.status(200).json({ message: 'Users:', users});
} catch (error) {
  res.status(500).json({ message: 'Users not found' });
}
};


export const getUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({error: "User not found"})
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user', error);
    res.status(500).json({error: "Error retrieving user"});
  }
};

export const deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await User.destroy({where: { id }
    });
    if (result) {
      res.status(200).json({ message: "User deleted successfully"})
    } else {
      res.status(404).json({ message: "Error deleting user"})
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({error: "Error deleting user"})
  }
};