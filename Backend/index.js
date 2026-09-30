import "dotenv/config";
import app from "./server/app.js";
import database from "./config/db.js";
import "./models/Usuario.js";
import "./models/Galpao.js";
import "./models/Lote.js";
import "./models/Racao.js";
import "./models/Mortalidade.js";
import "./models/Categoria.js";
import "./models/Avaliacao.js";
import "./models/Pesagem.js";
import "./models/Vacina.js";
import "./models/ControleLuz.js";
import "./models/Entrada.js";
import "./models/Matrizes.js";
import "./models/MatrizVacina.js";
import "./models/PesoIdeal.js";
import { seedDemo } from "./seed.js";

const PORT = Number(process.env.PORT) || 3000;

async function bootstrap() {
    try {
        await database.authenticate();
        await database.sync();
        await seedDemo();

        const dialect = process.env.DB_DIALECT || "sqlite";
        const server = app.listen(PORT, "0.0.0.0", () => {
            console.log(`Conecta Granja API em http://localhost:${PORT} (${dialect})`);
            console.log("Login: admin@conectagranja.com / Admin@123");
        });

        server.on("error", (error) => {
            if (error.code === "EADDRINUSE") {
                console.error(`Porta ${PORT} ocupada. Feche o outro node e rode npm start de novo.`);
            } else {
                console.error(error);
            }
            process.exit(1);
        });
    } catch (error) {
        console.error("Falha ao iniciar a API:", error.message);
        process.exit(1);
    }
}

bootstrap();
