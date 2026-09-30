import { DataTypes } from "sequelize";
import database from "../config/db.js";

const Galpao = database.define("Galpao",
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        descritivo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
);

export default Galpao;