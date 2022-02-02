import armureAssister from "../controllers/arm_AssController.js";
import equipement from "../controllers/equipementControllers.js";

export const setupRoutes = (app) => {
  app.use("/armure", armureAssister);
  app.use("/equipement", equipementControllers);
};
