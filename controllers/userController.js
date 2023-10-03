const User = require("../models/User");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(422).json({
          message:
            "A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra, um número e um caractere especial.",
        });
      }

      if (password !== confirmPassword) {
        return res.status(422).json({ message: "As senhas não conferem!" });
      }

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(422).json({ message: "Usuário já existe!" });
      }

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = {
        name,
        email,
        password: passwordHash,
      };

      const userCreated = await UserModel.create(user);

      res
        .status(201)
        .json({ userCreated, message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message:
          "Aconteceu um erro interno no servidor, por favor tente mais tarde.",
      });
    }
  },
};

module.exports = userController;
