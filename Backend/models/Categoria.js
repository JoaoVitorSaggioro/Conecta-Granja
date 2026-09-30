import { DataTypes } from "sequelize";
import database from "../config/db.js";

const Categoria = database.define("Categoria",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        descritivo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }
);

export default Categoria;
