import { Router } from "express";
import MatrizVacinaController from "../controller/MatrizVacinaController.js";

const router = Router();

router.post("/", MatrizVacinaController.create);
router.get("/", MatrizVacinaController.list);
router.get("/:id", MatrizVacinaController.show);
router.put("/:id", MatrizVacinaController.update);
router.delete("/:id", MatrizVacinaController.delete);

export default router;