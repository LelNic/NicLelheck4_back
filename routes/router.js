import armureAssister from "../controllers/armureAssisterControllers.js";
import equipementControllers from "../controllers/equipementControllers.js";
import adminController from "../controllers/adminControllers.js";
import userController from "../controllers/userControllers.js";
import securityController from "../controllers/securityControllers.js";

export const setupRoutes = (app) => {
  app.use("/armure", armureAssister);
  app.use("/equipement", equipementControllers);
  app.use("/admin", adminController);
  app.use("/users", userController);
  app.use("/security", securityController);
};
