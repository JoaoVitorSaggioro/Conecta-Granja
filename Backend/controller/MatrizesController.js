import Matrizes from "../models/Matrizes.js";
import Lote from "../models/Lote.js";
class MatrizesController {

    async create(req, res) {
        const { lote_id, quantidade_alojada, lote_matriz, idade, linhagem } = req.body;

        if (!lote_id || !quantidade_alojada || !lote_matriz || !idade || !linhagem) {
            return res.status(400).json({ error: "Todos os campos São Obrigatorios!" });
        }

        const loteExist = await Lote.findByPk(lote_id);

        if (!loteExist) {
            return res.status(404).json({ error: "Lote não Encontrado!" });
        }

        try {

           const  matriz =  await Matrizes.create({
                lote_id,
                quantidade_alojada,
                lote_matriz,
                idade,
                linhagem
            })

            return res.status(201).json({ message: "Matriz Cadastrada com Sucesso", matriz });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }

    async list(req, res) {

        try {
            const matriz = await Matrizes.findAll();
            return res.status(200).json(matriz);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const matriz = await Matrizes.findByPk(id);

            if (!matriz) {
                return res.status(404).json({ error: "Matriz não cadastrada!" });
            }

            return res.status(200).json(matriz);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        const { lote_id, quantidade_alojada, lote_matriz, idade, linhagem } = req.body;
        const { id } = req.params;

        try {
        const matriz = await Matrizes.findByPk(id);

        if (!matriz) {
            return res.status(404).json({ error: "Matriz não cadastrada!" });
        }

        const updateMatriz = {}

        if (lote_id) updateMatriz.lote_id = lote_id;
        if (quantidade_alojada) updateMatriz.quantidade_alojada = quantidade_alojada;
        if (lote_matriz) updateMatriz.lote_matriz = lote_matriz;
        if (idade) updateMatriz.idade = idade;
        if (linhagem) updateMatriz.linhagem = linhagem;

     
            if (lote_id) {
                const loteExiste = await Lote.findByPk(lote_id);

                if (!loteExiste) {
                    return res.status(404).json({
                        error: "Lote não encontrado!"
                    });
                }
            }

            await matriz.update(updateMatriz)

            return res.status(200).json({ message: "Matriz Atualizada Com Sucesso!", matriz });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const matriz = await Matrizes.findByPk(id);

            if (!matriz) {
                return res.status(404).json({ error: "Matriz não cadastrada!" });
            }

            await matriz.destroy();

            return res.status(200).json({ message: "Matriz Excluida com Sucesso!" })

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new MatrizesController();