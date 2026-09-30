import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Lote from "./Lote.js";
import Categoria from "./Categoria.js"
const Avaliacao = database.define("Avaliacao_Alojamento",
    {
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
        categoria_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // descritivo: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        resultado: {
            type: DataTypes.ENUM("SIM", "NÃO"),
            defaultValue: "SIM",
            allowNull: false
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00,
            comment: "Valor da Avaliação do Alojamento"
        },
        data_avaliacao: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }
);
Lote.hasMany(Avaliacao, {
    foreignKey: "lote_id"
});

Avaliacao.belongsTo(Lote, {
    foreignKey: "lote_id"
});

Categoria.hasMany(Avaliacao, {
    foreignKey: "categoria_id"
});

Avaliacao.belongsTo(Categoria, {
    foreignKey: "categoria_id"
});

export default Avaliacao;