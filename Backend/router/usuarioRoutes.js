import { Router } from "express";
import UsuarioController from "../controller/UsuarioController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js"
import AdminMiddleware from "../middlewares/AdminMiddleware.js"

const router = Router();

router.post("/login", UsuarioController.login);
router.post("/", AuthMiddleware.auth, AdminMiddleware.admin, UsuarioController.create);
router.get("/", AuthMiddleware.auth, AdminMiddleware.admin, UsuarioController.list);
router.get("/:id", AuthMiddleware.auth, AdminMiddleware.admin, UsuarioController.show);
router.put("/:id", AuthMiddleware.auth, AdminMiddleware.admin, UsuarioController.update);
router.delete("/:id", AuthMiddleware.auth, AdminMiddleware.admin, UsuarioController.delete);

export default router;