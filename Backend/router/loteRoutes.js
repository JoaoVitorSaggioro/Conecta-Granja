import { Router } from "express";
import LoteController from "../controller/LoteController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import AdminMiddleware from "../middlewares/AdminMiddleware.js";

const router = Router();

router.get("/", AuthMiddleware.auth, LoteController.list);
router.get("/:id", AuthMiddleware.auth, LoteController.show);
router.post("/", AuthMiddleware.auth, AdminMiddleware.admin, LoteController.create);
router.put("/:id", AuthMiddleware.auth, AdminMiddleware.admin, LoteController.update);
router.patch("/:id/encerrar", AuthMiddleware.auth, AdminMiddleware.admin, LoteController.encerrar);

export default router;