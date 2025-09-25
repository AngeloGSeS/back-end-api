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
//server.js
let pool = null; // Variável para armazenar o pool de conexões com o banco de dados
// ######
// Local onde as rotas (endpoints) serão definidas
// ######
//server.js
// Função para obter uma conexão com o banco de dados
function conectarBD() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.URL_BD,
    });
  }
  return pool;
}
app.get("/", async (req, res) => {    


  console.log("Rota GET / solicitada"); // Log no terminal para indicar que a rota foi acessada
  // Cria uma nova instância do Pool de conexões com o banco de dados.
  //server.js
  const db = conectarBD(); // Cria uma nova instância do Pool para gerenciar conexões com o banco de dados

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
//server.js
app.get("/questoes", async (req, res) => {
	console.log("Rota GET /questoes solicitada"); // Log no terminal para indicar que a rota foi acessada
	//server.js
  //server.js
  const db = conectarBD(); // Cria uma nova instância do Pool para gerenciar conexões com o banco de dados

  //server.js
try {
    const resultado = await db.query("SELECT * FROM questoes"); // Executa uma consulta SQL para selecionar todas as questões
    const dados = resultado.rows; // Obtém as linhas retornadas pela consulta
    res.json(dados); // Retorna o resultado da consulta como JSON
  } catch (e) {
    console.error("Erro ao buscar questões:", e); // Log do erro no servidor
    res.status(500).json({
      erro: "Erro interno do servidor",
      mensagem: "Não foi possível buscar as questões",
    });
  }
});
