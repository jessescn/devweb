import { Router } from "express";
import { UserController } from "../controllers/UserController";
import ImageController from "../controllers/ImageController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { imageRepository, userRespository } from "../repositories";

const userController = new UserController(userRespository);
const imageController = new ImageController(imageRepository);

const routes = Router();
routes.post("/users/register", userController.register.bind(userController));
routes.post("/users/login", userController.login.bind(userController));

routes.use(authMiddleware);
routes.get("/users", userController.index.bind(userController));

routes.get("/images", imageController.index.bind(imageController));
routes.post("/images", imageController.save.bind(imageController));
routes.delete("/images/:id", imageController.delete.bind(imageController));

export default routes;
