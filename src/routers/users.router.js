import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js"

export const router = Router();

router.get("/", UserController.getUsers);
router.get("/:uid", UserController.getBy);
router.put("/:uid", UserController.update)
router.delete("/:uid",  UserController.delete);
