import { DataTypes } from "sequelize";
import database from "../config/db.js";
import Usuario from "./Usuario.js";
import Galpao from "./Galpao.js";

const Lote = database.define("Lote",{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    galpao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    data_entrada: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    data_saida: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    quantidade_inicial: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantidade_final: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    linhagem: {
      type: DataTypes.ENUM("Cobb", "Ross"),
      allowNull: false,
    },

    peso_medio_inicial: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Ativo", "Encerrado"),
      allowNull: false,
      defaultValue: "Ativo",
    },
  },
  {
    tableName: "lotes",
    timestamps: true,
  }
);


Usuario.hasMany(Lote, {foreignKey: "usuario_id",});

Lote.belongsTo(Usuario, {foreignKey: "usuario_id",});

Galpao.hasMany(Lote, {foreignKey: "galpao_id",});

Lote.belongsTo(Galpao, {foreignKey: "galpao_id",});

export default Lote;