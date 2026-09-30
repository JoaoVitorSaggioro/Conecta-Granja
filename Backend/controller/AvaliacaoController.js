import Avaliacao from "../models/Avaliacao.js";
import Categoria from "../models/Categoria.js";
import Lote from "../models/Lote.js";


class AvaliacaoController {

    async create(req, res) {
        const { lote_id, categoria_id, resultado, valor, data_avaliacao } = req.body;

        try {
            if (!lote_id || !categoria_id || !resultado || valor == null || !data_avaliacao) {
                return res.status(400).json({ error: "Preencha Todos os Campos!" });
            }

            if (valor < 0) {
                return res.status(400).json({ error: "Erro: Verifique novamente!" });
            }

            const lote = await Lote.findByPk(lote_id);

            if (!lote) {
                return res.status(404).json({ error: "Lote não Existente!" });
            }

            const categoria = await Categoria.findByPk(categoria_id);

            if (!categoria) {
                return res.status(404).json({ error: "Categoria não Existente!" });
            }

            const existe = await Avaliacao.findOne({
                where: {
                    lote_id,
                    categoria_id,
                    data_avaliacao
                }
            });

            if (existe) {
                return res.status(400).json({ error: "Avaliação já Cadastrada!" });
            }

            const createAvaliacao = await Avaliacao.create({
                lote_id,
                categoria_id,
                resultado,
                valor,
                data_avaliacao
            });

            return res.status(201).json({ message: "Avaliação Criada Com Sucesso!!", createAvaliacao });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async list(req, res) {
        try {
            const avaliacao = await Avaliacao.findAll({
                include: [
                    {
                        model: Lote
                    },
                    {
                        model: Categoria
                    }
                ]
            });

            return res.status(200).json(avaliacao);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const avaliacao = await Avaliacao.findByPk(id);
            if (!avaliacao) {
                return res.status(404).json({ error: "Avaliação Não Encontrada!" });
            }

            return res.status(200).json(avaliacao);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { lote_id, categoria_id, resultado, valor, data_avaliacao } = req.body;
        const { id } = req.params;

        try {
            if (valor != null && valor < 0) {
                return res.status(400).json({
                    error: "O valor não pode ser negativo."
                });
            }

            if (lote_id) {
                const lote = await Lote.findByPk(lote_id);
                if (!lote) {
                    return res.status(404).json({ error: "Lote não Encontrado!" });
                }
            }
            if (categoria_id) {
                const categoria = await Categoria.findByPk(categoria_id);
                if (!categoria) {
                    return res.status(404).json({ error: "Categoria não Encontrada!" });
                }
            }

            const avaliacao = await Avaliacao.findByPk(id);
            if (!avaliacao) {
                return res.status(404).json({ error: "Avaliação não Encontrada!" });

            }

            const finalLoteId = lote_id ?? avaliacao.lote_id;
            const finalCategoriaId = categoria_id ?? avaliacao.categoria_id;
            const finalDataAvalicao = data_avaliacao ?? avaliacao.data_avaliacao;

            const existe = await Avaliacao.findOne({
                where: {
                    lote_id: finalLoteId,
                    categoria_id: finalCategoriaId,
                    data_avaliacao: finalDataAvalicao
                }
            });

            if (existe && existe.id !== avaliacao.id) {
                return res.status(400).json({ error: "Já existe Avaliação com esses Dados!" });
            }

            const updateAvaliacao = {}

            if (lote_id) updateAvaliacao.lote_id = lote_id;
            if (categoria_id) updateAvaliacao.categoria_id = categoria_id;
            if (resultado) updateAvaliacao.resultado = resultado;
            if (valor != null) updateAvaliacao.valor = valor;
            if (data_avaliacao) updateAvaliacao.data_avaliacao = data_avaliacao;

            await avaliacao.update(updateAvaliacao);

            return res.status(200).json({ message: "Avaliação Atualizada Com Sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const avaliacao = await Avaliacao.findByPk(id);
            if (!avaliacao) {
                return res.status(404).json({ error: "Avaliação Não Encontrada!" });
            }
            await avaliacao.destroy()
            return res.status(200).json({ message: "Avaliação Deletada Com Sucesso" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new AvaliacaoController();
