import { Router } from "express";
import VacinaController from "../controller/VacinaController.js";

const router = Router();

router.post("/", VacinaController.create);
router.get("/", VacinaController.list);
router.get("/:id", VacinaController.show);
router.put("/:id", VacinaController.update);
router.delete("/:id", VacinaController.delete);

export default router;