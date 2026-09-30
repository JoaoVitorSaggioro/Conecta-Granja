import PesoIdeal from "../models/PesoIdeal.js";

class PesoIdealController{

    async create(req, res){
        const {idade, peso_ideal} = req.body;

        try {
             if(!idade || !peso_ideal){
            return res.status(400).json({error: "Digite idade e peso!"});
            }

            if(idade <= 0){
            return res.status(400).json({error: "Erro verifique novamente!"});
            }

            if(peso_ideal <= 0){
            return res.status(400).json({error: "Erro verifique novamente!"});
            }

            const peso = await PesoIdeal.findOne({
                where: {
                 idade
             }
            });

            if(peso){
            return res.status(400).json({error: "Esse Peso já está cadastrado!"})
            }

            const novoPeso = await PesoIdeal.create({
                idade,
                peso_ideal
            });
            
            return res.status(201).json({message: "Peso Criado com Sucesso!", novoPeso})
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async list(req, res){
        
        try {
            const peso = await PesoIdeal.findAll();
            return res.status(200).json(peso);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async show(req, res){
        const {id} = req.params;

        try {
            const peso = await PesoIdeal.findByPk(id);
            if(!peso){
                return res.status(404).json({error: "Não Existe Peso Cadastrado!"});
            }
           return res.status(200).json(peso);
        } catch (error) {
             return res.status(500).json({error: error.message});
        }
    }

    async update(req, res){
        const {idade, peso_ideal} = req.body;
        const {id} = req.params;

        try {

            if(idade && idade <= 0){
            return res.status(400).json({error: "Erro verifique novamente!"});
            }

            if(peso_ideal && peso_ideal <= 0){
            return res.status(400).json({error: "Erro verifique novamente!"});
            }

            const peso = await PesoIdeal.findByPk(id);

            if(!peso){
                return res.status(404).json({error: "Não Existe Peso Cadastrado!"});
            }

            const existe = await PesoIdeal.findOne({
                where: {
                    idade: idade || peso.idade
                }
            })

            if(existe && existe.id !== peso.id){
                return res.status(400).json({error: "Já existe dados cadastrados!"})
            }
    
            const pesoUpdate = {};

            if(idade) pesoUpdate.idade = idade
            if(peso_ideal) pesoUpdate.peso_ideal = peso_ideal;

            await peso.update(pesoUpdate);

            return res.status(200).json({message: "Peso Atualizado com Sucesso!"})
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async delete(req, res){
      const {id} = req.params;

        try {
            const peso = await PesoIdeal.findByPk(id);
            if(!peso){
                return res.status(404).json({error: "Não Existe Peso Cadastrado!"});
            }
           await peso.destroy();

           return res.status(200).json({message: "Peso Excluido com Sucesso!"})
        } catch (error) {
             return res.status(500).json({error: error.message});
        }
    }
}

export default new PesoIdealController();