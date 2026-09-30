import ControleLuz from "../models/ControleLuz.js";
import Lote from "../models/Lote.js";

class ControleLuzController {

    async create(req, res) {
        const { lote_id, idade_inicial, idade_final, horas_escuro } = req.body;

        try {
            if (!lote_id || !idade_inicial || !idade_final || !horas_escuro) {
                return res.status(400).json({ error: "Digite Todos os Campos!" });
            }

            if (idade_inicial <= 0) {
                return res.status(400).json({ error: "Erro Verifique Novamente!" });
            }
            if (idade_final <= idade_inicial) {
                return res.status(400).json({ error: "Erro Verifique Novamente!" });
            }
            if (horas_escuro <= 0) {
                return res.status(400).json({
                    error: "Horas de escuro inválidas!"
                });
            }

            if (lote_id) {
                const lote = await Lote.findByPk(lote_id);

                if (!lote) {
                    return res.status(404).json({
                        error: "Lote não encontrado!"
                    });
                }
            }

            const existe = await ControleLuz.findOne({
                where: {
                    lote_id,
                    idade_inicial
                }
            });

            if (existe) {
                return res.status(400).json({ error: "Já existe Controle de Luz para esse Lote!" });
            }

            const createLuz = await ControleLuz.create({
                lote_id,
                idade_inicial,
                idade_final,
                horas_escuro
            });

            return res.status(201).json({ message: "Criado com Sucesso!", createLuz });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async list(req, res) {
        try {
            const luz = await ControleLuz.findAll();
            return res.status(200).json(luz);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const existe = await ControleLuz.findByPk(id);
            if (!existe) {
                return res.status(404).json({ error: "Controle de Luz não encontrado!" });
            }
            return res.status(200).json(existe);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { lote_id, idade_inicial, idade_final, horas_escuro } = req.body;
        const { id } = req.params;
        try {

            if (idade_inicial && idade_inicial <= 0) {
                return res.status(400).json({ error: "Idade inicial inválida!" });
            }

            if (horas_escuro && horas_escuro <= 0) {
                return res.status(400).json({
                    error: "Horas de escuro inválidas!"
                });
            }

            if (lote_id) {
                const lote = await Lote.findByPk(lote_id);

                if (!lote) {
                    return res.status(404).json({
                        error: "Lote não encontrado!"
                    });
                }
            }
            const controleLuz = await ControleLuz.findByPk(id);

            if (!controleLuz) {
                return res.status(404).json({
                    error: "Controle de Luz não encontrado!"
                });
            }

            const idadeInicial =
                idade_inicial || controleLuz.idade_inicial;

            const idadeFinal =
                idade_final || controleLuz.idade_final;

            if (idadeFinal <= idadeInicial) {
                return res.status(400).json({
                    error: "A idade final deve ser maior que a idade inicial."
                });
            }
            const existeIdade = await ControleLuz.findOne({
                where: {
                    lote_id: lote_id || controleLuz.lote_id,
                    idade_inicial: idade_inicial || controleLuz.idade_inicial
                }
            });

            if (existeIdade && existeIdade.id !== controleLuz.id) {
                return res.status(400).json({ error: "Já existe Data Inicial Cadastrada!" })
            }

            const existeIdadeFinal = await ControleLuz.findOne({
                where: {
                    lote_id: lote_id || controleLuz.lote_id,
                    idade_final: idade_final || controleLuz.idade_final
                }
            });

            if (existeIdadeFinal && existeIdadeFinal.id !== controleLuz.id) {
                return res.status(400).json({ error: "Já existe Data Final Cadastrada!" })
            }

            const updateLuz = {};

            if (lote_id) updateLuz.lote_id = lote_id;
            if (idade_inicial) updateLuz.idade_inicial = idade_inicial;
            if (idade_final) updateLuz.idade_final = idade_final;
            if (horas_escuro) updateLuz.horas_escuro = horas_escuro;

            await controleLuz.update(updateLuz);

            return res.status(200).json({ message: "Controle Luz Atualizado Com Sucesso!", controleLuz });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async delete(req, res) {
        const { id } = req.params;

        try {
            const existe = await ControleLuz.findByPk(id);
            if (!existe) {
                return res.status(404).json({ error: "Controle de Luz não encontrado!" });
            }

            await existe.destroy();

            return res.status(200).json({ message: "Excluido com Sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new ControleLuzController();