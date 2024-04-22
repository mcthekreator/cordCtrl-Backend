const userModel = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  registerUser: async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        image,
        address1,
        address2,
        region,
        country,
        verificationCode,
      } = req.body;
      const salt = await bcrypt.genSalt(15);
      const hashpassword = await bcrypt.hash(password, salt);
      const newUser = new userModel({
        name,
        email,
        password: hashpassword,
        image,
        address1,
        address2,
        region,
        country,
        verificationCode,
      });
      await newUser.save();
      let payload = { subject: newUser.subject };
      let token = jwt.sign(payload, process.env.JWT_SECRET);
      res.status(200).send({ token });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        res.status(403).json({ error: "Invalid password!" });
      } else {
        let payload = { subject: user.email };
        token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({ token });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const user = await userModel.find({});
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  },
};

module.exports = userController;
