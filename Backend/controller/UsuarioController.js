import Usuario from "../models/Usuario.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


class UsuarioController {

    async create(req, res) {

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: "Obrigatorio nome, email e senha!" })
        }

        const userExists = await Usuario.findOne({
            where: {
                email
            }
        })

        if (userExists) {
            return res.status(400).json({ error: "Usuario já Existente!" })
        }

        try {
            const senha_hash = await argon2.hash(senha);

            const usuario = await Usuario.create({
                nome,
                email,
                senha: senha_hash,
                perfil: "funcionario"
            });

            return res.status(201).json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            });

        } catch (error) {
            return res.status(500).json({
                error: "Erro ao Criar Usuario"
            });
        }

    }

    async login(req, res) {
        const { email, senha, perfil } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: "Erro email ou senha!" })
        }

        const usuario = await Usuario.findOne({
            where: {
                email
            }
        })

        if (!usuario) {
            return res.status(401).json({ error: "Email ou senha inválidos." });
        }

        try {
            const compareHash = await argon2.verify(usuario.senha, senha);

            if (!compareHash) {
                return res.status(401).json({ error: "Email ou senha inválidos." });
            }

            const token = jwt.sign({
                id: usuario.id,
                perfil: usuario.perfil
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES || "1d"
                }
            )
            return res.status(200).json({
                message: "Login realizado com Sucesso!",
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    perfil: usuario.perfil
                }
            })

        } catch (error) {
            return res.status(500).json({ error: "Error ao Efetuar login" })
        }

    }

    async list(req, res) {

        try {

            const usuario = await Usuario.findAll({
                attributes: {
                    exclude: ['senha']
                }
            })

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async show(req, res) {
        const { id } = req.params

        try {
            const usuario = await Usuario.findByPk(id,
                {
                    attributes: {
                        exclude: ['senha']
                    }
                }
            );
            if (!usuario) {
                return res.status(404).json({ error: "Usuario não encontrado" })
            }

            return res.status(200).json(usuario);

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }

    }
    async update(req, res) {

        const { nome, email, senha } = req.body;
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(400).json({ error: "Usuario não Encontrado!" })
        }

        try {

            const UserUpgrade = {
                nome,
                email
            };

            if (senha) {
                UserUpgrade.senha = await argon2.hash(senha);
            }

            if (email !== usuario.email) {

                const emailExists = await Usuario.findOne({
                    where: { email }
                });

                if (emailExists) {
                    return res.status(400).json({
                        error: "Email já cadastrado."
                    });
                }

            }

            await usuario.update(UserUpgrade);

            return res.status(200).json({ message: "Usuario Alterado com Sucesso!" })


        } catch (error) {
            return res.status(401).json({ error: "Erro ao Alterar Usuario" })
        }

    }

    async delete(req, res) {
        const { id } = req.params;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(400).json({ error: "Usuario não Encontrado!" })
        }
        try {

            await usuario.destroy()
            return res.status(200).json({ message: "Usuario Excluido com Sucesso" });
        } catch (error) {
            return res.status(401).json({ error: "Algo deu Errado!" })
        }

    }
}

export default new UsuarioController();