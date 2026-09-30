import { DataTypes} from "sequelize";
import database from "../config/db.js";
import Matrizes from "./Matrizes.js"
import Vacina from "./Vacina.js"

const MatrizVacina = database.define("Matriz_Vacina", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    matriz_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vacina_id: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
});

MatrizVacina.belongsTo(Matrizes, {foreignKey: 'matriz_id'});
MatrizVacina.belongsTo(Vacina, {foreignKey: 'vacina_id'});
Matrizes.hasMany(MatrizVacina, {foreignKey: "matriz_id"});
Vacina.hasMany(MatrizVacina, {foreignKey: "vacina_id"});

export default MatrizVacina;