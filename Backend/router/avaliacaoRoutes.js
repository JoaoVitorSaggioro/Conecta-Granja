import { Router } from "express";
import AvaliacaoController from "../controller/AvaliacaoController.js"

const router = Router();

router.post("/", AvaliacaoController.create);
router.get("/", AvaliacaoController.list);
router.get("/:id", AvaliacaoController.show);
router.put("/:id", AvaliacaoController.update);
router.delete("/:id", AvaliacaoController.delete);

export default router;