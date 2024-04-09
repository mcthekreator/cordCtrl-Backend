const userModel = require("../model/users.model");
const bcrypt = require ('bcrypt')

const userController = {
  registerUser: async (req, res) => {
    try {
        const { username, email, password,image } = req.body;
        const salt = await bcrypt.genSalt(15);
        const hashpassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            username,
            email,
            password: hashpassword,
            image,
        })
        await newUser.save()
        res.status(200).json('A new user created successfully')
    } catch (error) {
        res.status(404).json({message:error.message})
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
