import express from "express";
import UserController from "../controllers/UserController";
import ImageController from "../controllers/ImageController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = express.Router();
routes.post("/register", UserController.create);
routes.post("/login", UserController.login);

routes.use(authMiddleware);
routes.get("/images", ImageController.index);
routes.post("/images", ImageController.save);

export default routes;
