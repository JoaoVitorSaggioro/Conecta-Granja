import { Router } from "express";
import PesoIdealController from "../controller/PesoIdealController.js";
import AdminMiddleware from "../middlewares/AdminMiddleware.js";

const router = Router();

router.get("/", PesoIdealController.list);
router.get("/:id", PesoIdealController.show);
router.post("/", AdminMiddleware.admin, PesoIdealController.create);
router.put("/:id", AdminMiddleware.admin, PesoIdealController.update);
router.delete("/:id", AdminMiddleware.admin,PesoIdealController.delete);

export default router;