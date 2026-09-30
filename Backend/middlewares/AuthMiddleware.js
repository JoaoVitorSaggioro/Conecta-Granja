    import Usuario from "../models/Usuario.js";
    import jwt from "jsonwebtoken";


    class AuthMiddleware {

        async auth(req, res, next) {

            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(401).json({ error: "Token Não Informado" })
            };

            const [bearer, token] = authHeader.split(" ");

            if (bearer !== "Bearer" || !token) {
                return res.status(401).json({
                    error: "Token mal formatado."
                });
            }
            try {
                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

                const usuario = await Usuario.findByPk(decoded.id);
                if (!usuario) {
                    return res.status(401).json({ error: "Usuario não encontrado!" })
                }

                req.userId = usuario.id;
                req.userPerfil = usuario.perfil;

                return next()
            } catch (error) {
                return res.status(401).json({
                    error: 'Token inválido.'
                });
            }
        }
    }

    export default new AuthMiddleware();