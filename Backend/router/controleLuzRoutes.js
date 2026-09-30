import { Router } from "express";
import ControleLuzController from "../controller/ControleLuzController.js";

const router = Router();

router.post("/", ControleLuzController.create);
router.get("/", ControleLuzController.list);
router.get("/:id", ControleLuzController.show);
router.put("/:id", ControleLuzController.update);
router.delete("/:id", ControleLuzController.delete);

export default router;