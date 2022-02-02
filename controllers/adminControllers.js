import express from "express";
import middleware from "../services/middleware.js";

const router = express.Router();

router.get("/", middleware.verifyAdmin, async (req, res) => {
  res.send({ message: "Hello admin" }).status(200);
});

export default router;
