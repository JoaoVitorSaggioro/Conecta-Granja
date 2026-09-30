import { Router } from "express";
import EntradaController from "../controller/EntradaController.js";

const router = Router();

router.post("/", EntradaController.create);
router.get("/", EntradaController.list);
router.get("/:id", EntradaController.show);
router.put("/:id", EntradaController.update);
router.delete("/:id", EntradaController.delete);

export default router;