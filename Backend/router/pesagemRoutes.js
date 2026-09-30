import { Router } from "express";
import PesagemController from "../controller/PesagemController.js"

const router = Router();

router.post("/", PesagemController.create);
router.get("/", PesagemController.list);
router.get("/:id", PesagemController.show);
router.put("/:id", PesagemController.update);
router.delete("/:id", PesagemController.delete);

export default router;