import express from "express";
import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import middleware from "../service/middleware.js";

const router = express.Router();
const saltRounds = 10;
const schemaUser = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required().trim(true),
  password: Joi.string().min(8).required().trim(true),
  birthdate: Joi.date(),
});

router
  .post("/register", async (req, res) => {
    const { firstname, lastname, email, password, bithdate } = req.body;
    try {
      const userIsValid = schemaUser.validate({ firstname, lastname, email, password, bithdate });
      const userExist = await User.findByEmail(userIsValid.value.email);
      if (userIsValid.error) return res.json({ error: userIsValid.error.details[0].message }).status(422);
      if (userExist) return res.json({ error: "L'email existe déjà" }).status(409);
      try {
        const hash = bcrypt.hashSync(userIsValid.value.password, saltRounds);
        userIsValid.value.password = hash;
        const userId = await User.createNew(userIsValid.value);
        const user = await User.findById(userId);
        res.json(user).status(201);
      } catch (error) {
        res.json({ error: error.message }).status(500);
      }
    } catch (error) {
      res.json({ message: error.message }).status(500);
    }
  })
  .post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const userIsValid = schemaUser.validate({ email, password });
      const userExist = await User.findByEmail(userIsValid.value.email);
      if (userExist) {
        const passwordIsValid = bcrypt.compareSync(userIsValid.value.password, userExist.password);
        if (passwordIsValid) {
          const token = jwt.sign({ id: userExist.id, role: userExist.is_admin }, process.env.SERVER_SECRET, {
            expiresIn: 360000 * 4,
          });
          res
            .send({
              token: token,
              user: {
                id: userExist.id,
                email: userExist.email,
                pseudo: userExist.pseudo,
                role: userExist.is_admin,
              },
            })
            .status(200);
        } else res.json({ error: "Mot de Passe Invalide" }).status(401);
      } else res.json({ error: "Utilisateur non trouvé" }).status(404);
    } catch (error) {
      res.json({ message: error.message }.status(500));
    }
  })

  .get("/user-is-auth", middleware.verifyJWT, (req, res) => {
    res.json({ auth: true, message: "Utilisateur authentifié" }).status(200);
  });

export default router;
