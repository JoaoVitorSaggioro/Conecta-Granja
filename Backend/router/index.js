import { Router } from "express";

import AuthMiddleware from "../middlewares/AuthMiddleware.js";

import usuarioRoutes from "./usuarioRoutes.js";
import loteRoutes from "./loteRoutes.js";
import galpaoRoutes from "./galpaoRoutes.js";
import racaoRoutes from "./racaoRoutes.js";
import mortalidadeRoutes from "./mortalidadeRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";
import avaliacaoRoutes from "./avaliacaoRoutes.js";
import pesagemRoutes from "./pesagemRoutes.js";
import vacinaRoutes from "./vacinaRoutes.js";
import controleLuzRoutes from "./controleLuzRoutes.js";
import entradaRoutes from "./entradaRoutes.js";
import matrizRoutes from "./matrizRoutes.js";
import matrizVacinaRoutes from "./matrizVacinaRoutes.js";
import pesoIdealRoutes from "./pesoIdealRoutes.js";

const routes = Router();

routes.get("/health", (_req, res) => {
    res.json({ status: "ok", servico: "Conecta Granja API" });
});

routes.use("/usuarios", usuarioRoutes);

// Rotas Com Token
routes.use(AuthMiddleware.auth);

routes.use("/lotes", loteRoutes);
routes.use("/galpoes", galpaoRoutes);
routes.use("/racoes", racaoRoutes);
routes.use("/mortalidades", mortalidadeRoutes);
routes.use("/categorias", categoriaRoutes);
routes.use("/avaliacoes", avaliacaoRoutes);
routes.use("/pesagens", pesagemRoutes);
routes.use("/vacinas", vacinaRoutes);
routes.use("/luz", controleLuzRoutes);
routes.use("/entrada", entradaRoutes);
routes.use("/matriz", matrizRoutes);
routes.use("/matrizvacina", matrizVacinaRoutes);
routes.use("/pesoideal", pesoIdealRoutes);

export default routes;