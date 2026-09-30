import { DataTypes } from "sequelize";
import database from "../config/db.js";


const PesoIdeal = database.define("Peso_Ideal",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        idade: {
            type: DataTypes.SMALLINT.UNSIGNED,
            allowNull: false
        },
        peso_ideal: {
            type: DataTypes.DECIMAL(8, 3),
            allowNull: false
        }
})

export default PesoIdeal;