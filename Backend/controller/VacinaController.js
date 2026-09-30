import Vacina from "../models/Vacina.js";

class VacinaController {

    async create(req, res) {
        const { lote_id, data_vacina, produto, n_partida, eficiencia } = req.body;

        try {
            if (!lote_id || !data_vacina || !produto || !n_partida || !eficiencia) {
                return res.status(400).json({ error: "Obrigatorio Preencher Todos os Campos!" })
            }

            const vacinaExist = await Vacina.findOne({
                where: {
                    lote_id,
                    produto,
                    data_vacina
                }
            });

            if (vacinaExist) {
                return res.status(400).json({ error: "Vacina já cadastrada!" });
            }

            const vacina = await Vacina.create({
                lote_id,
                data_vacina,
                produto,
                n_partida,
                eficiencia
            });

            return res.status(201).json({ message: "Vacina Cadastrada", vacina });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async list(req, res) {
        try {
            const vacina = await Vacina.findAll();
            return res.status(200).json(vacina)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const vacina = await Vacina.findByPk(id);

            if (!vacina) {
                return res.status(404).json({ error: "Nenhuma Vacina Cadastrada!" })
            }

            return res.status(200).json(vacina)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { data_vacina, produto, n_partida, eficiencia } = req.body;
        const { id } = req.params;

        try {

            const vacina = await Vacina.findByPk(id);

            if (!vacina) {
                return res.status(404).json({ error: "Nenhuma Vacina Cadastrada!" })
            }
            if (produto && produto !== vacina.produto) {

                const existe = await Vacina.findOne({
                    where: { produto }
                });

                if (existe) {
                    return res.status(400).json({
                        error: "Já existe uma vacina com esse produto."
                    });
                }
            }

            const updateVacina = {};

            if (data_vacina) updateVacina.data_vacina = data_vacina;
            if (produto) updateVacina.produto = produto;
            if (n_partida) updateVacina.n_partida = n_partida;
            if (eficiencia) updateVacina.eficiencia = eficiencia;

            await vacina.update(updateVacina);

            return res.status(200).json({ message: "Vacina atualizada com Sucesso", vacina });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const vacina = await Vacina.findByPk(id);

            if (!vacina) {
                return res.status(400).json({ error: "Vacina não encontrada!" });
            }

            await vacina.destroy();

            return res.status(200).json({ message: "Vacina Excluida com Sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new VacinaController();