import express from "express";
import User from "../models/userModels.js";
import Joi from "joi";
const router = express.Router();

const schemaUser = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(3).required(),
  image: Joi.string().min(3),
  date: Joi.date().required(),
  id_category: Joi.number().integer().required(),
});

router
  .get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const user = await User.findById(id);

      res.json(user).status(200);
    } catch (error) {
      res.json({ message: error.message }).status(500);
    }
  })

  .get("/", async (req, res) => {
    try {
      const user = await User.getAll();

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .put("/:id", async (req, res) => {
    const user = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date: req.body.date,
      id_category: req.body.id_category,
    };

    try {
      const { error, value } = await schemaUser.validate(user);
      const userUpdate = await User.updateUser(value);
      if (userUpdate) res.json(user);
      else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .post("/", async (req, res) => {
    const user = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date: req.body.date,
      id_category: req.body.id_category,
    };

    try {
      const { error, value } = await schemaUser.validate(user);
      const userCreate = await User.createNew(value);
      if (userCreate) {
        const newUser = await User.getOneById(userCreate);
        res.json(newUser);
      } else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const userDelete = await User.deleteById(id);
      if (userDelete) {
        res.json(`L'user ${id} a bien été effacée`);
      } else {
        res.status(422).json(`Une erreur est survenue lors de la suppression`);
      }
    } catch (error) {
      res.status(500).json(`Erreur serveur`);
    }
    return res.status(201).end();
  });

export default router;
