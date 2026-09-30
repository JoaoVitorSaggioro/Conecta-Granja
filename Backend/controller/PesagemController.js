import Pesagem from "../models/Pesagem.js";
import Lote from "../models/Lote.js"

class PesagemController {

    async create(req, res) {
        const { lote_id, idade, peso_medio, data_pesagem } = req.body;

        try {
            if (!lote_id || !idade || !peso_medio || !data_pesagem) {
                return res.status(400).json({ error: "Preencha todos os campos!" });
            }

            if (idade <= 0) {
                return res.status(400).json({ error: 'Erro Verifique novamente a Idade!' });
            }
            if (peso_medio <= 0) {
                return res.status(400).json({ error: 'Erro Verifique novamente o Peso!' });
            }

            const lote = await Lote.findByPk(lote_id);

            if (!lote) {
                return res.status(404).json({
                    error: "Lote não encontrado!"
                });
            }

            const existPesagem = await Pesagem.findOne({
                where: {
                    lote_id,
                    idade,
                }
            });

            if (existPesagem) {
                return res.status(400).json({ error: "Já existe uma pesagem cadastrada para esse lote nessa idade." });
            }

            const createPesagem = await Pesagem.create({
                lote_id,
                idade,
                data_pesagem,
                peso_medio
            });
            return res.status(201).json({ message: "Pesagem Criado com Sucesso!", createPesagem })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async list(req, res) {
        try {
            const pesagem = await Pesagem.findAll();
            return res.status(200).json(pesagem);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const pesagem = await Pesagem.findByPk(id);
            if (!pesagem) {
                return res.status(404).json({ error: "Não encotramos Pesagem!" })
            }
            return res.status(200).json(pesagem);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { lote_id, idade, peso_medio, data_pesagem } = req.body;
        const { id } = req.params;
        try {

            if (idade && idade <= 0) {
                return res.status(400).json({
                    error: "Verifique novamente a idade!"
                });
            }

            if (peso_medio && peso_medio <= 0) {
                return res.status(400).json({
                    error: "Verifique novamente o peso!"
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

            const pesagem = await Pesagem.findByPk(id);

            if (!pesagem) {
                return res.status(404).json({
                    error: "Pesagem não encontrada!"
                });
            }

            const existePesagem = await Pesagem.findOne({
                where: {
                    lote_id: lote_id || pesagem.lote_id,
                    idade: idade || pesagem.idade
                }
            });

            if (existePesagem && existePesagem.id !== pesagem.id) {
                return res.status(400).json({
                    error: "Já existe uma pesagem cadastrada para esse lote nessa idade."
                });
            }
            const existeDate = await Pesagem.findOne({
                where: {
                    lote_id: lote_id || pesagem.lote_id,
                    data_pesagem: data_pesagem || pesagem.data_pesagem
                }
            });

            if (existeDate && existeDate.id !== pesagem.id) {
                return res.status(400).json({
                    error: "Já existe essa Data de Pesagem!"
                });
            }

            const updatePesagem = {};

            if (lote_id) updatePesagem.lote_id = lote_id;
            if (idade) updatePesagem.idade = idade;
            if (peso_medio) updatePesagem.peso_medio = peso_medio;
            if (data_pesagem) updatePesagem.data_pesagem = data_pesagem;

            await pesagem.update(updatePesagem);
            return res.status(200).json({
                message: "Pesagem atualizada com sucesso!", pesagem
            });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const pesagem = await Pesagem.findByPk(id);
            if (!pesagem) {
                return res.status(404
                ).json({ error: "Não existe essa Pesagem!" });
            }

            await pesagem.destroy();

            return res.status(200).json({ message: "Excluido com Sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new PesagemController();