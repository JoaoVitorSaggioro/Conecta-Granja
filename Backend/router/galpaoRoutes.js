import { Router } from "express";
import GalpaoController from "../controller/GalpaoController.js"
import AdminMiddleware from "../middlewares/AdminMiddleware.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = Router();


router.get("/", AuthMiddleware.auth, GalpaoController.list);
router.get("/:id", AuthMiddleware.auth, GalpaoController.show);
router.post("/", AuthMiddleware.auth, AdminMiddleware.admin, GalpaoController.create);
router.put("/:id",AuthMiddleware.auth, AdminMiddleware.admin, GalpaoController.update);
router.delete("/:id", AuthMiddleware.auth, AdminMiddleware.admin, GalpaoController.delete);

export default router;