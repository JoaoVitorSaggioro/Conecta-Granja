import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Lote from "../models/Lote.js"
 
const Entrada = database.define("Entrada", {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    lote_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_hora: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    procedencia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tecnico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    motorista: {
        type: DataTypes.STRING,
        allowNull: false
    },
    placa_caminhao: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
})

Lote.hasOne(Entrada, {
    foreignKey: "lote_id"
});

Entrada.belongsTo(Lote, {
    foreignKey: "lote_id"
});
export default Entrada;