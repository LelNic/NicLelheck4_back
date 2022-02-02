import express from "express";
import armureAssister from "../models/armureAssisterModel.js";
import Joi from "joi";
// import { resolvePath } from "react-router";
const router = express.Router();

const schemaArmureAssister = Joi.object({
  id: Joi.intinger().required,
  name: Joi.string().min(3).max(255).required(),
  fonction: Joi.string().min(3),
  note: Joi.string().min(3),
});

router
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const ArmureAssister = await ArmureAssister.getOneById(id);

      res.json(armureAssister);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .get("/", async (req, res) => {
    try {
      const armureAssister = await armureAssister.getAll();

      res.json(armureAssister);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .put("/:id", async (req, res) => {
    const armureAssister = {
      id: req.params.id,
      name: req.body.name,
      fonction: req.body.fonction,
      note: req.body.note,
    };

    try {
      const { error, value } = await schemaArmureAssister.validate(arm_Ass);
      const armureAssisterUpdate = await armureAssister.updateArmureAssister(value);
      if (armureAssisterUpdate) res.json(armureAssister);
      else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .post("/", async (req, res) => {
    const armureAssister = {
      id: req.params.id,
      name: req.body.name,
      fonction: req.body.fonction,
      note: req.body.note,
    };

    try {
      const { error, value } = await schemaArmureAssister.validate(armureAssister);
      const armureAssisterCreate = await armureAssister.createNew(value);
      if (armureAssisterCreate) {
        const newArmureAssister = await armureAssister.getOneById(armureAssisterCreate);
        res.json(newArmureAssister);
      } else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const armureAssisterDelete = await armureAssister.deleteById(id);
      if (armureAssisterDelete) {
        res.json(`l'Armure Assister ${id} a bien été effacée`);
      } else {
        res.status(422).json(`Une erreur est survenue lors de la suppression`);
      }
    } catch (error) {
      res.status(500).json(`Erreur serveur`);
    }
    return res.status(201).end();
  });

export default router;
