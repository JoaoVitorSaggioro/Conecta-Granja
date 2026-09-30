import { Router } from "express";
import MatrizesController from "../controller/MatrizesController.js";
import AdminMiddleware from "../middlewares/AdminMiddleware.js";

const router = Router();

router.get("/", MatrizesController.list);
router.get("/:id", MatrizesController.show);
router.post("/", AdminMiddleware.admin, MatrizesController.create);
router.put("/:id", AdminMiddleware.admin, MatrizesController.update);
router.delete("/:id", AdminMiddleware.admin, MatrizesController.delete);

export default router;