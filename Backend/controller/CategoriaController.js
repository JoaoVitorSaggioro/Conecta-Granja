import Categoria from "../models/Categoria.js";

class CategoriaController{

    async create(req, res){
        const {descritivo} = req.body;

        try {
            if(!descritivo){
            return res.status(400).json({error: "Digite o Descritivo!"});
            }

        const categoria = await Categoria.findOne({
                where: {
                    descritivo
                }
        })

        if(categoria){
            return res.status(400).json({error: "Já Existe Essa Categoria Cadastrada!"});
        }

        const createCategoria =  await Categoria.create({
                descritivo
        });

        return res.status(201).json({message: "Categoria Cadastrada Com Sucesso!", createCategoria});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async list(req, res){
    
        try {
            const categoria = await Categoria.findAll();
            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async show(req, res){
        const {id} = req.params;
        
        try {
            const categoria = await Categoria.findByPk(id);

            if(!categoria){
                return res.status(404).json({error: "Categoria Não Encontrada!"});
            }
            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async update(req, res){
        const {descritivo} = req.body;
        const {id} = req.params;

        try {

            const categoria = await Categoria.findByPk(id);

            if(!categoria){
                return res.status(404).json({error: "Categoria não Encontrada!"});
            }

            const existe = await Categoria.findOne({
                where: {
                    descritivo: descritivo || categoria.descritivo
                }
            });

            if(existe && existe.id !== categoria.id){
                return res.status(400).json({error: "Já existe essa Categoria!"});
            }

            const updateCategoria = {}

            if(descritivo) updateCategoria.descritivo = descritivo;

            await categoria.update(updateCategoria);

            return res.status(200).json({message: "Categoria Atualizada Com Sucesso!", categoria});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async delete(req, res){
        const {id} = req.params;

           try {
            const categoria = await Categoria.findByPk(id);

            if(!categoria){
                return res.status(404).json({error: "Categoria Não Encontrada!"});
            }
            await categoria.destroy()

            
            return res.status(200).json({message: "Categoria Excluida Com Sucesso!"});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }
}

export default new CategoriaController();