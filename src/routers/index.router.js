import { Router } from "express";
import { router as usersRouter } from "./users.router.js";
import { router as productRouter} from "./prodcuts.router.js";
import { router as sessionsRouter } from "./session.router.js";
import { router as mockRuoter } from "./mock.router.js"

export const router = Router();

router.use("/sessions", sessionsRouter);
router.use("/users", usersRouter);
router.use("/products", productRouter);
router.use("/mocks", mockRuoter);