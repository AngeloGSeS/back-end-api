// ######
// Local onde os pacotes de dependências serão importados
// ######
import pkg from "pg";
import dotenv from "dotenv";
import express from "express";      // Requisição do pacote do express


// ######
// Local onde as configurações do servidor serão feitas
// ######
const app = express();              // Instancia o Express
const port = 3000;                  // Define a porta
dotenv.config();         // Carrega e processa o arquivo .env
const { Pool } = pkg;    // Utiliza a Classe Pool do Postgres
// ######
// Local onde as rotas (endpoints) serão definidas
// ######
app.get("/", async (req, res) => {    


  console.log("Rota GET / solicitada"); // Log no terminal para indicar que a rota foi acessada
  // Cria uma nova instância do Pool de conexões com o banco de dados.
  const db = new Pool({
    connectionString: process.env.URL_BD,
  });

  let dbStatus = "ok";

  // Testa a conexão com o banco
  try {
    await db.query("SELECT 1");
  } catch (e) {
    dbStatus = e.message;
  }
  // Responde com um JSON contendo uma mensagem
  res.json({
		descricao: "API para Completar tarefa",    // Substitua pelo conteúdo da sua API
    autor: "Ângelo Gabriel Souza e Silva",     // Substitua pelo seu nome
    statusBD: dbStatus
  });
});

// ######
// Local onde o servidor escutar as requisições que chegam
// ######
app.listen(port, () => {
  console.log(`Serviço rodando na porta:  ${port}`);
});