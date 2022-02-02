import armureAssister from "../controllers/armureAssisterControllers.js";
import equipementControllers from "../controllers/equipementControllers.js";

export const setupRoutes = (app) => {
  app.use("/armure", armureAssister);
  app.use("/equipement", equipementControllers);
};
