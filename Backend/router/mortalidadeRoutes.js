import { Router } from "express";
import MortalidadeController from "../controller/MortalidadeController.js"

const router = Router();

router.post("/", MortalidadeController.create);
router.get("/", MortalidadeController.list);
router.get("/:id", MortalidadeController.show);
router.put("/:id", MortalidadeController.update);
router.delete("/:id", MortalidadeController.delete);

export default router;