const {validationResult} = require("express-validator");
const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
      const {username, email, password} = req.body;
      let user = await User.findOne({email});
      if (user) {
        return res.status(400).json({msg: 'User already exists'});
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRoles = await Role.findOne({value: 'USER'});
      user = new User({username, email, password: hashPassword, roles: [userRoles.value]});
      await user.save();
      return res.status(200).json({message: "User is successfully created"})
    } catch (e) {
      console.log(e)
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;
      console.log(User, 'User')
      let user = await User.findOne({ email });
      console.log(user, 'user')
      if (!user) {
        return res.status(404).json({message: "User doesn't exist"});
      }

      const isMatch = await bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(401).json({message: 'Invalid Credentials'});
      }

      return res.status(200).json({message: "success"})
    } catch (e) {
      console.log(e)
    }
  }

  async getUsers(req, res) {
    try {
      return res.json({message: "success"})
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new authController()