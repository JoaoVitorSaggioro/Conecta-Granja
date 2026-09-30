import Lote from '../models/Lote.js'
import Galpao from '../models/Galpao.js';

class LoteController {

    async create(req, res) {
        const { galpao_id, data_entrada, quantidade_inicial, linhagem, peso_medio_inicial } = req.body;

        if (!galpao_id || !data_entrada || !quantidade_inicial || !linhagem || !peso_medio_inicial) {
            return res.status(400).json({ error: "Os campos não foram preenchidos corretamente!" });
        }

        try {

            const galpao = await Galpao.findByPk(galpao_id);

            if (!galpao) {
                return res.status(404).json({ error: "Galpão não encontrado!" });
            }
            
            const loteAtivo = await Lote.findOne({
                where: {
                    galpao_id,
                    status: "Ativo"
                }
            });

            if (loteAtivo) {
                return res.status(400).json({
                    error: "Já existe um lote ativo neste galpão."
                });
            }

            const lote = await Lote.create({
                usuario_id: req.userId,
                galpao_id,
                data_entrada,
                quantidade_inicial,
                linhagem,
                peso_medio_inicial,
                status: "Ativo"
            });

            return res.status(201).json({ message: "Lote Criado com Sucesso!", lote });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }

    async list (req, res){
        
        try {
            const lotes = await Lote.findAll()
            
            return res.status(200).json(lotes);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async show(req, res){
        const {id} = req.params;

        try {
            const lote = await Lote.findByPk(id);

            if(!lote){
                return res.status(400).json({error: "Lote não Encontrado!"});
            }

            return res.status(200).json(lote);
        
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async update(req, res){
        const {id} = req.params;
        const {galpao_id, data_entrada, data_saida, quantidade_inicial, quantidade_final, linhagem, peso_medio_inicial, status} = req.body;

        try {

            const lote = await Lote.findByPk(id);
                if(!lote){
                    return res.status(404).json({
                        error: "Lote não encontrado!"
                    });
                }
            const LoteUpdate = {};

            if (galpao_id) LoteUpdate.galpao_id = galpao_id;
            if (data_entrada) LoteUpdate.data_entrada = data_entrada;
            if (data_saida) LoteUpdate.data_saida = data_saida;
            if (quantidade_inicial) LoteUpdate.quantidade_inicial = quantidade_inicial;
            if (quantidade_final) LoteUpdate.quantidade_final = quantidade_final;
            if (linhagem) LoteUpdate.linhagem = linhagem;
            if (peso_medio_inicial) LoteUpdate.peso_medio_inicial = peso_medio_inicial;
            if (status) LoteUpdate.status = status;

            await lote.update(LoteUpdate)

            return res.status(201).json({message: "Lote Atulizado com Sucesso"});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async encerrar(req, res) {
    try {
        const { id } = req.params;

        const lote = await Lote.findByPk(id);

        if (!lote) {
            return res.status(404).json({
                error: "Lote não encontrado"
            });
        }

        lote.status = "Encerrado";

        await lote.save();

        return res.json({
            message: "Lote encerrado com sucesso",
            lote
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

}

export default new LoteController();
