import { DataTypes } from "sequelize";
import database from "../config/db.js";

const Usuario = database.define("Usuario",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        perfil: {
            type: DataTypes.ENUM("admin", "funcionario"),
            defaultValue: "funcionario",
            allowNull: false
        }
    },
        {timestamps: true}
);

export default Usuario;