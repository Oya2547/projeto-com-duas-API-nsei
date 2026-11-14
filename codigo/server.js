const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/combo', async (req, res) => {
  try {
    const respostaBored = await fetch('https://bored-api.appbrewery.com/random');
    const dadosBored = await respostaBored.json();

    const respostaAdvice = await fetch('https://api.adviceslip.com/advice');
    const dadosAdvice = await respostaAdvice.json();

    res.json({
      atividade: dadosBored,
      conselho: dadosAdvice.slip
    });
  } catch (erro) {
    res.status(500).json({ erro: 'Vish boy deu ruim no servidorkkkkkkkkkkk' });
  }
});

app.get('/api/bored/random', async (req, res) => {
  const resposta = await fetch('https://bored-api.appbrewery.com/random');
  const dados = await resposta.json();
  res.json(dados);
});

app.get('/api/bored/filter', async (req, res) => {
  const { type, participants } = req.query;
  const resposta = await fetch(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
  const dados = await resposta.json();
  res.json(dados);
});

app.get('/api/bored/activity/:key', async (req, res) => {
  const key = req.params.key;
  const resposta = await fetch(`https://bored-api.appbrewery.com/activity/${key}`);
  const dados = await resposta.json();
  res.json(dados);
});

app.get('/api/advice/random', async (req, res) => {
  const resposta = await fetch('https://api.adviceslip.com/advice');
  const dados = await resposta.json();
  res.json(dados.slip);
});

app.get('/api/advice/id/:id', async (req, res) => {
  const id = req.params.id;
  const resposta = await fetch(`https://api.adviceslip.com/advice/${id}`);
  const dados = await resposta.json();
  res.json(dados);
});

app.get('/api/advice/search/:query', async (req, res) => {
  const query = req.params.query;
  const resposta = await fetch(`https://api.adviceslip.com/advice/search/${query}`);
  const dados = await resposta.json();
  res.json(dados);
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta 3000');
});
