import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";
import { passportCall } from "../utils/passport.utils.js";
import { access } from "../middlewares/access.js";

export const router = Router();

router.get("/", ProductsController.getProducts);
router.get("/:pid", ProductsController.getBy);
router.put("/:pid", passportCall("current"), access("admin"), ProductsController.update);
router.post("/", passportCall("current"), access("admin"), ProductsController.create);
router.delete("/:pid", passportCall("current"), access("admin"), ProductsController.delete);