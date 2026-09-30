import { Router } from "express";
import CategoriaController from "../controller/CategoriaController.js"
import AdminMiddleware from "../middlewares/AdminMiddleware.js";

const router = Router();

router.get("/", CategoriaController.list);
router.get("/:id", CategoriaController.show);
router.post("/", AdminMiddleware.admin, CategoriaController.create);
router.put("/:id", AdminMiddleware.admin, CategoriaController.update);
router.delete("/:id", AdminMiddleware.admin, CategoriaController.delete);


export default router;  