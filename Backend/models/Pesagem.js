import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Lote from "./Lote.js"

const Pesagem = database.define("Pesagem", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    lote_id: {
        type: DataTypes.INTEGER,
        allowNull: false  
    },
    idade: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    peso_medio: {
        type: DataTypes.DECIMAL(8, 3),
        allowNull: false
    },
    data_pesagem: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

Lote.hasMany(Pesagem, {
    foreignKey: "lote_id"
});

Pesagem.belongsTo(Lote, {
    foreignKey: "lote_id"
});

export default Pesagem; 