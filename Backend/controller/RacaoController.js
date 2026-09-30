import Racao from "../models/Racao.js";
import Lote from "../models/Lote.js";

class RacaoController {
    async create(req, res) {
        const { lote_id, data, motorista, tipo, quantidade, estoque } = req.body;

        try {
            if (!lote_id || !data || !motorista || !tipo || quantidade == null || estoque == null) {
                return res.status(400).json({ error: "Preencha Todos os Campos!" });
            }

            if (quantidade <= 0) {
                return res.status(400).json({
                    error: "A quantidade deve ser maior que zero."
                });
            }
            if (estoque < 0) {
                return res.status(400).json({ error: "O estoque não pode ser negativo."});
            }


            if (lote_id) {
                const lote = await Lote.findByPk(lote_id);

                if (!lote) {
                    return res.status(404).json({ error: "Lote não Encontrado!" });
                }
            }

            const existe = await Racao.findOne({
                where: {
                    lote_id,
                    data,
                    tipo
                }
            });

            if (existe) {
                return res.status(400).json({ error: "Já existe um registro dessa ração para este lote nesta data." });
            }

            const createRacao = await Racao.create({
                lote_id,
                data,
                motorista,
                tipo,
                quantidade,
                estoque
            })

            return res.status(201).json({ message: "Criado com Sucesso!", createRacao });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async list(req, res) {
        try {
            const racao = await Racao.findAll();
            return res.status(200).json(racao);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        try {
            const existe = await Racao.findByPk(id);
            if (!existe) {
                return res.status(404).json({ error: "Ração Não Encontrada!" });
            }

            return res.status(200).json(existe);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { lote_id, data, motorista, tipo, quantidade, estoque } = req.body;
        const { id } = req.params;

        try {

            if (lote_id) {
                const lote = await Lote.findByPk(lote_id);

                if (!lote) {
                    return res.status(404).json({ error: "Lote não encontrado!" });
                }
            }

            const racao = await Racao.findByPk(id);

            if (!racao) {
                return res.status(404).json({ error: "Ração não encontrada!" });
            }

    

            const updateRacao = {};

            const quantidadeRacao = quantidade ?? racao.quantidade;
            const estoqueRacao = estoque ?? racao.estoque;

            if (quantidadeRacao <= 0) {
                return res.status(400).json({
                    error: "A quantidade deve ser maior que zero."
                });
            }

            if (estoqueRacao < 0) {
                return res.status(400).json({
                    error: "O estoque não pode ser negativo."
                });
            }

                 const existeRacao = await Racao.findOne({
                where: {
                    lote_id: lote_id || racao.lote_id,
                    data: data || racao.data,
                    tipo: tipo || racao.tipo
                }
            });

            if (existeRacao && existeRacao.id !== racao.id) {
                return res.status(400).json({
                    error: "Já existe Ração Cadastrada!"
                });
            }

            if (lote_id) updateRacao.lote_id = lote_id;
            if (data) updateRacao.data = data;
            if (motorista) updateRacao.motorista = motorista;
            if (tipo) updateRacao.tipo = tipo;
            if (quantidade != null)
                updateRacao.quantidade = quantidade;

            if (estoque != null)
                updateRacao.estoque = estoque;

            await racao.update(updateRacao);

            return res.status(200).json({ message: "Ração Atualizada Com Sucesso!", racao });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const existe = await Racao.findByPk(id);
            if (!existe) {
                return res.status(404).json({ error: "Ração Não Encontrada!" });
            }
            await existe.destroy()
            return res.status(200).json({ message: "Excluida com Sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new RacaoController();