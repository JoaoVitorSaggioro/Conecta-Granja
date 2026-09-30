import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(rootDir, "../.env") });

const dialect = process.env.DB_DIALECT || "sqlite";

function createDatabase() {
    if (dialect === "sqlite") {
        const storage = path.resolve(
            rootDir,
            "..",
            process.env.DB_STORAGE || "./data/conecta-granja.sqlite"
        );
        fs.mkdirSync(path.dirname(storage), { recursive: true });
        console.log(`SQLite: ${storage}`);

        return new Sequelize({
            dialect: "sqlite",
            storage,
            logging: false,
        });
    }

    return new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            dialect,
            host: process.env.DB_HOST || "localhost",
            port: Number(process.env.DB_PORT) || 3306,
            logging: false,
        }
    );
}

const database = createDatabase();

export default database;
