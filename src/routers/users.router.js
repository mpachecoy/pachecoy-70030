import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js"

export const router = Router();

router.get("/", auth, UserController.getUsers);
router.get("/:uid", UserController.getBy);
router.delete("/:uid", UserController.delete);


router.get("/simplex", (req, res) => {
    return res.status(200).json({ message: "OK" });
});

router.get("/complex", (req, res) => {
  let total = 1;
  for (let i = 1; i < 1000000000; i++) {
    total = i * i;
  }
  return res.status(200).json({ total });
});
