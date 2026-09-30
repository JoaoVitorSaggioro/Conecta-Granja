class AdminMiddleware {
    admin(req, res, next) {

        if (req.userPerfil !== "admin") {
            return res.status(403).json({
                error: "Acesso permitido apenas para administradores."
            });
        }

        return next();
    }
}

export default new AdminMiddleware();