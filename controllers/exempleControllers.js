import express from "express";
import Article from "../models/articleModel.js";
import Joi from "joi";
const router = express.Router();

const schemaArticle = Joi.object({
  id: Joi.number().integer(),
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
      const article = await Article.getOneById(id);

      res.json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .get("/", async (req, res) => {
    try {
      const article = await Article.getAll();

      res.json(article);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .put("/:id", async (req, res) => {
    const article = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date: req.body.date,
      id_category: req.body.id_category,
    };

    try {
      const { error, value } = await schemaArticle.validate(article);
      const articleUpdate = await Article.updateArticle(value);
      if (articleUpdate) res.json(article);
      else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .post("/", async (req, res) => {
    const article = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date: req.body.date,
      id_category: req.body.id_category,
    };

    try {
      const { error, value } = await schemaArticle.validate(article);
      const articleCreate = await Article.createNew(value);
      if (articleCreate) {
        const newArticle = await Article.getOneById(articleCreate);
        res.json(newArticle);
      } else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const articleDelete = await Article.deleteById(id);
      if (articleDelete) {
        res.json(`L'article ${id} a bien été effacée`);
      } else {
        res.status(422).json(`Une erreur est survenue lors de la suppression`);
      }
    } catch (error) {
      res.status(500).json(`Erreur serveur`);
    }
    return res.status(201).end();
  });

export default router;
