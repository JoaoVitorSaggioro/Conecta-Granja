import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Lote from "../models/Lote.js"

const Mortalidade = database.define("Mortalidade", {
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
    data_mortalidade: {
        type: DataTypes.DATE,
        allowNull: false
    },
    idade: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false
    },
    total_mortalidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
         defaultValue: 0
    },
    natural: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    colapso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    ascite: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    refugo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    problema_locomotor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
});

Lote.hasMany(Mortalidade, {
    foreignKey: "lote_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});

Mortalidade.belongsTo(Lote, {
    foreignKey: "lote_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
});
export default Mortalidade;