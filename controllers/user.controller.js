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
  login: async  (req, res)=>{
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).send({ error: "User not found!" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
  
      if (!validPassword) {
        res.status(403).send({error: "Invalid password!"});
      } else {
        res.status(200).json(user);
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
