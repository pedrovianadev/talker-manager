const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const token = require('./utils/generator');
const emailValidator = require('./utils/email');
const passValidator = require('./utils/password');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;
const PORT = process.env.PORT || '3001';
const talkers = path.resolve(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talker = JSON.parse(await fs.readFile(talkers, 'utf-8'));

  return res.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const talker = JSON.parse(await fs.readFile(talkers, 'utf-8'));

  const findId = talker.find(({ id }) => id === Number(req.params.id));

  if (!findId) {
    return res.status(NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(HTTP_OK_STATUS).json(findId);
});

// https://nodejs.org/api/crypto.html#cryptorandombytessize-callback
// Ajudou a pensar a lógica para criar o gerador de token.

app.post('/login', emailValidator, passValidator, (req, res) => {
  const tokenGen = token();

  res.status(HTTP_OK_STATUS).json({ token: tokenGen });
});
