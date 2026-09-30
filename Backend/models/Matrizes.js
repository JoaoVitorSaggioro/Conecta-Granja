import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Lote from "../models/Lote.js"

const Matrizes = database.define("Matrizes", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    lote_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidade_alojada: {  
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lote_matriz: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idade: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    linhagem: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Lote.hasMany(Matrizes, {
    foreignKey: "lote_id"
});

Matrizes.belongsTo(Lote, {
    foreignKey: "lote_id"
});

export default Matrizes;