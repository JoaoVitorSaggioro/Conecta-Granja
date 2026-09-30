import Matrizes from "../models/Matrizes.js";
import MatrizVacina from "../models/MatrizVacina.js";
import Vacina from "../models/Vacina.js";

class MatrizVacinaController {

    async create(req, res) {
        const { matriz_id, vacina_id } = req.body;

        try {
            if (!matriz_id || !vacina_id) {
                return res.status(400).json({
                    error: "Todos os campos são obrigatórios!"
                });
            }
            const matriz = await Matrizes.findByPk(matriz_id);
            if (!matriz) {
                return res.status(404).json({ error: "Matriz não encontrada!" });
            }

            const vacina = await Vacina.findByPk(vacina_id);
            if (!vacina) {
                return res.status(404).json({ error: "Vacina não encontrada!" });
            }

            const existe = await MatrizVacina.findOne({
                where: {
                    matriz_id,
                    vacina_id
                }
            });

            if (existe) {
                return res.status(400).json({ error: "Essa vacina já foi vinculada a essa matriz." });
            }

            const matrizVacina = await MatrizVacina.create({
                matriz_id,
                vacina_id
            });

            return res.status(201).json({ message: "Criado com Sucesso!", matrizVacina });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async list(req, res) {

        try {
            const matrizVacina = await MatrizVacina.findAll();

            return res.status(200).json(matrizVacina);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const matrizVacina = await MatrizVacina.findByPk(id);

            if (!matrizVacina) {
                return res.status(404).json({ error: "Não Encontramos Vacina vinculada a Essa Matriz!" });
            }
            return res.status(200).json(matrizVacina);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { matriz_id, vacina_id } = req.body;
        const { id } = req.params;

        try {
            if (matriz_id) {

                const matriz = await Matrizes.findByPk(matriz_id);

                if (!matriz) {
                    return res.status(404).json({
                        error: "Matriz não encontrada!"
                    });
                }
            }
            if (vacina_id) {

                const vacina = await Vacina.findByPk(vacina_id);

                if (!vacina) {
                    return res.status(404).json({
                        error: "Vacina não encontrada!"
                    });
                }
            }

            const matrizVacina = await MatrizVacina.findByPk(id);
            if (!matrizVacina) {
                return res.status(404).json({ error: "Não Encontramos Vacina vinculada a Essa Matriz!" });
            }

            const updateMatrizVacina = {};

            if (matriz_id) updateMatrizVacina.matriz_id = matriz_id;
            if (vacina_id) updateMatrizVacina.vacina_id = vacina_id;

            const existe = await MatrizVacina.findOne({
                where: {
                    matriz_id: matriz_id || matrizVacina.matriz_id,
                    vacina_id: vacina_id || matrizVacina.vacina_id
                }
            });

            if (existe && existe.id !== matrizVacina.id) {
                return res.status(400).json({
                    error: "Essa vacina já está vinculada a essa matriz."
                });
            }

            await matrizVacina.update(updateMatrizVacina);

            return res.status(200).json({ message: "Atualizado com Sucesso" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async delete(req, res) {
        const { id } = req.params;

        try {
            const matrizVacina = await MatrizVacina.findByPk(id);
            if (!matrizVacina) {
                return res.status(404).json({ error: "Registro Não Encotrado!"});
            }

            await matrizVacina.destroy()

            return res.status(200).json({ message: "Excluido com Sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }
}

export default new MatrizVacinaController();