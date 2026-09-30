import Entrada from "../models/Entrada.js";
import Lote from "../models/Lote.js";

class EntradaController {

    async create(req, res) {
        const { lote_id, data_hora, procedencia, tecnico, motorista, placa_caminhao } = req.body;

        if (!lote_id || !data_hora || !procedencia || !tecnico || !motorista || !placa_caminhao) {
            return res.status(400).json({ error: "Preencha todos os Campos!" })
        }

        const loteExist = await Lote.findByPk(lote_id)

        if (!loteExist) {
            return res.status(404).json({
                error: "Lote não encontrado!"
            });
        }
        try {
            const entradaExist = await Entrada.findOne({
                where: {
                    lote_id
                }
            });

            if (entradaExist) {
                return res.status(400).json({ error: "Já existe essa Entrada!" })
            }

            const entrada = await Entrada.create({
                lote_id,
                data_hora,
                procedencia,
                tecnico,
                motorista,
                placa_caminhao
            })

            return res.status(201).json({ message: "Entrada Criada com Sucesso!" , entrada})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async list(req, res) {

        try {
            const entrada = await Entrada.findAll();
                return res.status(200).json(entrada);
        
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const entrada = await Entrada.findByPk(id);

            if (!entrada) {
                return res.status(400).json({ error: "Entrada não encontrada!" })
            }

            return res.status(200).json(entrada)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async update(req, res) {
        const { lote_id, data_hora, procedencia, tecnico, motorista, placa_caminhao } = req.body;
        const { id } = req.params;

        try {

            const entrada = await Entrada.findByPk(id);

            if (!entrada) {
                return res.status(400).json({ error: "Entrada não encontrada!" })
            }

            const entradaUpdate = {}

            if (lote_id) entradaUpdate.lote_id = lote_id;
            if (data_hora) entradaUpdate.data_hora = data_hora;
            if (procedencia) entradaUpdate.procedencia = procedencia;
            if (tecnico) entradaUpdate.tecnico = tecnico;
            if (motorista) entradaUpdate.motorista = motorista;
            if (placa_caminhao) entradaUpdate.placa_caminhao = placa_caminhao;

            await entrada.update(entradaUpdate)

            return res.status(201).json({ message: "Entrada Atulizado com Sucesso" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const entrada = await Entrada.findByPk(id);

            if (!entrada) {
                return res.status(400).json({ error: "Entrada não encontrada!" })
            }

            await entrada.destroy();

            return res.status(200).json({ message: "Entrada excluida com Sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
export default new EntradaController();