const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (user) => {
  const secretKey = 'secret';
  const expiresIn = '1h';
  return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      const token = generateToken(user);
      console.log('User logged in:', user);
      res.cookie("user_token", token, { httpOnly: true, maxAge:3600000});
      res.json({ user, token });
    } else {
      console.log('Invalid username or password');
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    const token = generateToken(user);
    console.log('User registered:', user);
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("user_token");
    res.json({ message: 'User logged out' });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login,
  logout
};
