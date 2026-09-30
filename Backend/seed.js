import argon2 from "argon2";
import Usuario from "./models/Usuario.js";
import Galpao from "./models/Galpao.js";
import Lote from "./models/Lote.js";
import Entrada from "./models/Entrada.js";
import Matrizes from "./models/Matrizes.js";
import Racao from "./models/Racao.js";
import Pesagem from "./models/Pesagem.js";
import PesoIdeal from "./models/PesoIdeal.js";
import ControleLuz from "./models/ControleLuz.js";
import Mortalidade from "./models/Mortalidade.js";
import Vacina from "./models/Vacina.js";
import MatrizVacina from "./models/MatrizVacina.js";
import Categoria from "./models/Categoria.js";
import Avaliacao from "./models/Avaliacao.js";

export async function seedDemo() {
    const adminEmail = process.env.ADMIN_EMAIL || "admin@conectagranja.com";
    const adminSenha = process.env.ADMIN_PASSWORD || "Admin@123";

    let admin = await Usuario.findOne({ where: { email: adminEmail } });
    const senhaHash = await argon2.hash(adminSenha);

    if (!admin) {
        admin = await Usuario.create({
            nome: "Administrador",
            email: adminEmail,
            senha: senhaHash,
            perfil: "admin",
        });
        console.log(`Usuário administrador criado: ${adminEmail}`);
    } else {
        await admin.update({ senha: senhaHash, perfil: "admin" });
    }

    const jaPopulado = await Galpao.count();
    if (jaPopulado > 0) {
        return;
    }

    await Usuario.create({
        nome: "Carlos Tratador",
        email: "funcionario@conectagranja.com",
        senha: await argon2.hash("Func@123"),
        perfil: "funcionario",
    });

    const galpao1 = await Galpao.create({ descritivo: "Galpão Norte", capacidade: 18000 });
    const galpao2 = await Galpao.create({ descritivo: "Galpão Sul", capacidade: 15000 });
    await Galpao.create({ descritivo: "Galpão Reserva", capacidade: 12000 });

    const lote = await Lote.create({
        usuario_id: admin.id,
        galpao_id: galpao1.id,
        data_entrada: "2026-07-20",
        quantidade_inicial: 16200,
        linhagem: "Cobb",
        peso_medio_inicial: 0.042,
        status: "Ativo",
    });

    await Lote.create({
        usuario_id: admin.id,
        galpao_id: galpao2.id,
        data_entrada: "2026-05-02",
        data_saida: "2026-06-14",
        quantidade_inicial: 14000,
        quantidade_final: 13280,
        linhagem: "Ross",
        peso_medio_inicial: 0.044,
        status: "Encerrado",
    });

    await Entrada.create({
        lote_id: lote.id,
        data_hora: new Date("2026-07-20T06:40:00"),
        procedencia: "Incubatório Vale Verde",
        tecnico: "Marina Alves",
        motorista: "José Ribeiro",
        placa_caminhao: "RTA-4B21",
    });

    const matriz = await Matrizes.create({
        lote_id: lote.id,
        quantidade_alojada: 16200,
        lote_matriz: 441,
        idade: 42,
        linhagem: "Cobb 500",
    });

    await Racao.create({
        lote_id: lote.id,
        data: new Date("2026-07-21T08:00:00"),
        motorista: "Paulo Mendes",
        tipo: "Inicial",
        quantidade: 2400,
        estoque: 2100,
    });

    await Racao.create({
        lote_id: lote.id,
        data: new Date("2026-08-04T08:00:00"),
        motorista: "Paulo Mendes",
        tipo: "Crescimento",
        quantidade: 3600,
        estoque: 3200,
    });

    await Pesagem.create({
        lote_id: lote.id,
        idade: 7,
        peso_medio: 0.185,
        data_pesagem: "2026-07-27",
    });
    await Pesagem.create({
        lote_id: lote.id,
        idade: 14,
        peso_medio: 0.462,
        data_pesagem: "2026-08-03",
    });
    await Pesagem.create({
        lote_id: lote.id,
        idade: 21,
        peso_medio: 0.910,
        data_pesagem: "2026-08-10",
    });

    const pesos = [
        [7, 0.180],
        [14, 0.450],
        [21, 0.880],
        [28, 1.420],
        [35, 2.050],
    ];
    for (const [idade, peso_ideal] of pesos) {
        await PesoIdeal.create({ idade, peso_ideal });
    }

    await ControleLuz.create({
        lote_id: lote.id,
        idade_inicial: 1,
        idade_final: 7,
        horas_escuro: 1,
    });
    await ControleLuz.create({
        lote_id: lote.id,
        idade_inicial: 8,
        idade_final: 21,
        horas_escuro: 4,
    });

    await Mortalidade.create({
        lote_id: lote.id,
        data_mortalidade: new Date("2026-07-22"),
        idade: 2,
        natural: 12,
        colapso: 3,
        ascite: 0,
        refugo: 8,
        problema_locomotor: 1,
        total_mortalidade: 24,
    });
    await Mortalidade.create({
        lote_id: lote.id,
        data_mortalidade: new Date("2026-08-08"),
        idade: 19,
        natural: 4,
        colapso: 2,
        ascite: 5,
        refugo: 3,
        problema_locomotor: 2,
        total_mortalidade: 16,
    });

    const vacina = await Vacina.create({
        lote_id: lote.id,
        data_vacina: "2026-07-21",
        produto: "Newcastle HB1",
        n_partida: "NC-8821",
        eficiencia: "BOA",
    });
    await Vacina.create({
        lote_id: lote.id,
        data_vacina: "2026-08-01",
        produto: "Gumboro intermediária",
        n_partida: "GB-4410",
        eficiencia: "REGULAR",
    });

    await MatrizVacina.create({
        matriz_id: matriz.id,
        vacina_id: vacina.id,
    });

    const cama = await Categoria.create({ descritivo: "Cama" });
    await Categoria.create({ descritivo: "Bebedouro" });
    await Categoria.create({ descritivo: "Comedouro" });
    await Categoria.create({ descritivo: "Ventilação" });

    await Avaliacao.create({
        lote_id: lote.id,
        categoria_id: cama.id,
        resultado: "SIM",
        valor: 8.5,
        data_avaliacao: new Date("2026-07-21"),
    });

    console.log("Base local populada com dados de demonstração.");
}
