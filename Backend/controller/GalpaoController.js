import Galpao from "../models/Galpao.js";
import Lote from "../models/Lote.js";

class GalpaoController {

    async create(req, res) {
        const { descritivo, capacidade } = req.body;

        if (!descritivo || !capacidade) {
            return res.status(400).json({ error: "Obrigatorio Descritivo, capacidade!" });
        }

        try {

            const galpaoExiste = await Galpao.findOne({
                where: {
                    descritivo
                }
            });

            if (galpaoExiste) {
                return res.status(400).json({
                    error: "Já existe um galpão com esse descritivo."
                });
            }
            const galpao = await Galpao.create({
                descritivo,
                capacidade
            });

            return res.status(201).json({ message: "Galpão Criado com Sucesso!", galpao });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async list(req, res) {

        try {
            const galpao = await Galpao.findAll();

            return res.status(200).json(galpao);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const galpao = await Galpao.findByPk(id);
            if (!galpao) {
                return res.status(404).json({ error: "Galpão não encontrado!" });
            }

            return res.status(200).json(galpao);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        const { descritivo, capacidade } = req.body;
        const { id } = req.params;

         const galpao = await Galpao.findByPk(id);

            if (!galpao) {
                return res.status(404).json({ error: "Galpão não Encontrado!" })
            }

        if (descritivo && descritivo !== galpao.descritivo) {

            const existe = await Galpao.findOne({
                where: { descritivo }
            });

            if (existe) {
                return res.status(400).json({
                    error: "Já existe um galpão com esse descritivo."
                });
            }
        }

        try {

            const GalpaoUpdate = {}

            if (descritivo) GalpaoUpdate.descritivo = descritivo;
            if (capacidade) GalpaoUpdate.capacidade = capacidade;

            await galpao.update(GalpaoUpdate);
            return res.status(200).json({ message: "Galpão atualizado com Sucesso!" })

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        const lote = await Lote.findOne({
            where: {
                galpao_id: id,
                status: "Ativo"
            }
        });

        if (lote) {
            return res.status(400).json({
                error: "Existe um lote ativo neste galpão."
            });
        }

        try {
            const galpao= await Galpao.findByPk(id);

            if (!galpao) {
                return res.status(404).json({ error: "Galpão não encontrado!" })
            }

            await galpao.destroy()

            return res.status(200).json({ message: "Galpão Excluido com Sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new GalpaoController();