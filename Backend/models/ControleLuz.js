import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Lote from "./Lote.js";

const ControleLuz = database.define("Controle_Luz", 
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        lote_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idade_inicial: {
            type: DataTypes.SMALLINT.UNSIGNED,
            allowNull: false
        },
        idade_final: {
            type: DataTypes.SMALLINT.UNSIGNED,
            allowNull: false
        },
        horas_escuro:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }
);

Lote.hasMany(ControleLuz, {
    foreignKey: "lote_id"
});

ControleLuz.belongsTo(Lote, {
    foreignKey: "lote_id"
});
export default ControleLuz;