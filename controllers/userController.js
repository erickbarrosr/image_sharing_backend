const UserModel = require("../models/User");

const userController = {
  create: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (!name) {
        return res.status(422).json({ message: "O nome é obrigatório!" });
      }

      if (!email) {
        return res.status(422).json({ message: "O email é obrigatório!" });
      }

      if (!password) {
        return res.status(422).json({ message: "A senha é obrigatória!" });
      }

      if (!confirmPassword) {
        return res
          .status(422)
          .json({ message: "A confirmação de senha é obrigatória!" });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
