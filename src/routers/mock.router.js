import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import UserController from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js"

export const router = Router();

router.get("/products/:quantity",  ProductsController.createMock);
router.get("/users/mock", UserController.createMock);
router.get("/users/:quantity", auth, UserController.createMocks);