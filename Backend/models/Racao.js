import {DataTypes} from "sequelize";
import database from '../config/db.js';
import Lote from "./Lote.js";

const Racao = database.define('Racao',
    {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    lote_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull:false,
    },
    motorista: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    estoque:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});


Lote.hasMany(Racao, {
    foreignKey: "lote_id"
});

Racao.belongsTo(Lote, {
    foreignKey: "lote_id"
});

export default Racao;