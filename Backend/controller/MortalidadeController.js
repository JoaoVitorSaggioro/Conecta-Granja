import Mortalidade from "../models/Mortalidade.js";
import Lote from "../models/Lote.js";

class MortalidadeController {
    async create(req, res) {
        const { lote_id, data_mortalidade, idade, natural, colapso, ascite, refugo, problema_locomotor } = req.body;

        try {

            if (!lote_id || !data_mortalidade || !idade || natural == null || colapso == null || ascite == null || refugo == null || problema_locomotor == null) {
                return res.status(400).json({ error: "Digite todos os campos!" });
            }

            if (idade <= 0) {
                return res.status(400).json({ error: "Idade precisa ser maior que 0" });
            }

            if (natural < 0 || colapso < 0 || ascite < 0 || refugo < 0 || problema_locomotor < 0) {
                return res.status(400).json({
                    error: "As quantidades não podem ser negativas."
                });
            }

            const lote = await Lote.findByPk(lote_id);

            if (!lote) {
                return res.status(404).json({ error: "Lote Não Encontrado!" })
            }

            const total_mortalidade = natural + colapso + ascite + refugo + problema_locomotor;

            const existeMortalidade = await Mortalidade.findOne({
                where: {
                    lote_id,
                    data_mortalidade
                }
            });

            if (existeMortalidade) {
                return res.status(400).json({ error: "Já existe essa Mortalidade Cadastrada!" });
            }

            const createMortalidade = await Mortalidade.create({
                lote_id,
                data_mortalidade,
                idade,
                total_mortalidade,
                natural,
                colapso,
                ascite,
                refugo,
                problema_locomotor
            });

            return res.status(201).json({ message: "Mortalidade Criada com Sucesso!", createMortalidade })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async list(req, res) {
        try {
            const mortalidade = await Mortalidade.findAll()
            return res.status(200).json(mortalidade);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const mortalidade = await Mortalidade.findByPk(id);
            if (!mortalidade) {
                return res.status(404).json({ error: "Mortalidade não Encontrada!" })
            }
            return res.status(200).json(mortalidade);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        const {lote_id, data_mortalidade, idade, natural, colapso, ascite, refugo, problema_locomotor} = req.body;
        const { id } = req.params;

        try {

            if (lote_id) {
                const lote = await Lote.findByPk(lote_id);

                if (!lote) {
                    return res.status(404).json({
                        error: "Lote não encontrado!"
                    });
                }
            }

            const mortalidade = await Mortalidade.findByPk(id);

            if (!mortalidade) {
                return res.status(404).json({
                    error: "Mortalidade não encontrada!"
                });
            }

            const idadeAtual = idade ?? mortalidade.idade;

            if (idadeAtual <= 0) {
                return res.status(400).json({
                    error: "A idade deve ser maior que zero."
                });
            }

            const naturalAtual = natural ?? mortalidade.natural;
            const colapsoAtual = colapso ?? mortalidade.colapso;
            const asciteAtual = ascite ?? mortalidade.ascite;
            const refugoAtual = refugo ?? mortalidade.refugo;
            const locomotorAtual = problema_locomotor ?? mortalidade.problema_locomotor;

            if (
                naturalAtual < 0 ||
                colapsoAtual < 0 ||
                asciteAtual < 0 ||
                refugoAtual < 0 ||
                locomotorAtual < 0
            ) {
                return res.status(400).json({
                    error: "As quantidades não podem ser negativas."
                });
            }

            const existeMortalidade = await Mortalidade.findOne({
                where: {
                    lote_id: lote_id ?? mortalidade.lote_id,
                    data_mortalidade: data_mortalidade ?? mortalidade.data_mortalidade
                }
            });

            if (existeMortalidade && existeMortalidade.id !== mortalidade.id) {
                return res.status(400).json({
                    error: "Já existe uma mortalidade cadastrada para esse lote nesta data."
                });
            }

            const total_mortalidade =
                naturalAtual +
                colapsoAtual +
                asciteAtual +
                refugoAtual +
                locomotorAtual;

            const updateMortalidade = {};

            if (lote_id) updateMortalidade.lote_id = lote_id;
            if (data_mortalidade) updateMortalidade.data_mortalidade = data_mortalidade;
            if (idade != null) updateMortalidade.idade = idade;
            if (natural != null) updateMortalidade.natural = natural;
            if (colapso != null) updateMortalidade.colapso = colapso;
            if (ascite != null) updateMortalidade.ascite = ascite;
            if (refugo != null) updateMortalidade.refugo = refugo;
            if (problema_locomotor != null) {
                updateMortalidade.problema_locomotor = problema_locomotor;
            }

            updateMortalidade.total_mortalidade = total_mortalidade;

            await mortalidade.update(updateMortalidade);

            return res.status(200).json({
                message: "Mortalidade atualizada com sucesso!",
                mortalidade
            });

        } catch (error) {
            return res.status(500).json({
                error: error.message
            });
        }
    }
    async delete(req, res) {
        const { id } = req.params;

        try {
            const mortalidade = await Mortalidade.findByPk(id);
            if (!mortalidade) {
                return res.status(404).json({ error: "Mortalidade não encontrada!" })
            }
            await mortalidade.destroy();
            return res.status(200).json({message: "Mortalidade Excluida com Sucesso!"})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

export default new MortalidadeController();