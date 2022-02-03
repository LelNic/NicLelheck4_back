import express from "express";
import Equipement from "../models/equipementModels.js";
import Joi from "joi";
// import { resolvePath } from "react-router";
const router = express.Router();

const schemaEquipement = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().min(3).max(255).required(),
  fonction: Joi.string().min(3),
  note: Joi.string().min(3),
});

router
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const equipement = await Equipement.getOneById(id);

      res.json(equipement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .get("/", async (req, res) => {
    try {
      const equipement = await Equipement.getAll();

      res.json(equipement);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .put("/:id", async (req, res) => {
    const equipement = {
      id: req.params.id,
      name: req.body.name,
      fonction: req.body.fonction,
      note: req.body.note,
    };

    try {
      const { error, value } = await schemaEquipement.validate(equipement);
      const equipementUpdate = await Equipement.updateEquipement(value);
      if (equipementUpdate) res.json(equipement);
      else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .post("/", async (req, res) => {
    const equipement = {
      id: req.params.id,
      name: req.body.name,
      fonction: req.body.fonction,
      note: req.body.note,
    };

    try {
      const { error, value } = await schemaEquipement.validate(Equipement);
      const equipementCreate = await Equipement.createNew(value);
      if (equipementCreate) {
        const newEquipement = await Equipement.getOneById(equipementCreate);
        res.json(newEquipement);
      } else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const equipementDelete = await Equipement.deleteById(id);
      if (equipementDelete) {
        res.json(`l'equipement ${id} a bien été effacée`);
      } else {
        res.status(422).json(`Une erreur est survenue lors de la suppression`);
      }
    } catch (error) {
      res.status(500).json(`Erreur serveur`);
    }
    return res.status(201).end();
  });

export default router;
