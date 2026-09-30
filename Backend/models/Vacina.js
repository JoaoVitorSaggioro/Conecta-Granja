import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Lote from "./Lote.js";

const Vacina = database.define("Vacina", {
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
    data_vacina: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    produto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    n_partida: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eficiencia: {
        type: DataTypes.ENUM("BOA", "REGULAR", "RUIM"),
        allowNull: false,
        defaultValue: "BOA"
    }
});

Lote.hasMany(Vacina, {
    foreignKey: "lote_id"
});

Vacina.belongsTo(Lote, {
    foreignKey: "lote_id"
});

export default Vacina;