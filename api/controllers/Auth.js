const {validationResult} = require("express-validator");
const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, roles) => {
  const payload = {id, roles};
  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600} )
}

const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const {username, email, password} = req.body;
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json([{msg: 'User already exists', param: 'email'}]);
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRoles = await Role.findOne({value: 'USER'});
    user = new User({username, email, password: hashPassword, roles: [userRoles.value]});
    await user.save();
    const token = generateAccessToken(user._id, user.roles);
    return res.status(200).json({username: user.username, token})
  } catch (e) {
    console.log(e);
    res.status(400).json({message: 'Registration error'});
  }
}

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({message: "User doesn't exist"});
    }
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({message: 'Invalid Credentials'});
    }
    const token = generateAccessToken(user._id, user.roles);
    return res.status(200).json({username: user.username, token});
  } catch (e) {
    console.log(e);
    res.status(400).json({message: 'Login error'});
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({users});
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  registration,
  login,
  getUsers,
}