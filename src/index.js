const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const token = require('./middlewares/genToken');
const emailValidator = require('./middlewares/email');
const passValidator = require('./middlewares/password');
const ageValidator = require('./middlewares/age');
const nameValidator = require('./middlewares/name');
const rateValidator = require('./middlewares/rate');
const talkValidator = require('./middlewares/talk');
const watchedAtValidator = require('./middlewares/watchedAt');
const tokenValidator = require('./middlewares/validateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const CREATED_STATUS = 201;
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

  return res.status(HTTP_OK_STATUS).json({ token: tokenGen });
});

app.post('/talker',
          tokenValidator,
          nameValidator,
          talkValidator,
          watchedAtValidator,
          rateValidator,
          ageValidator,
          async (req, res) => {
            const talk = await JSON.parse(await fs.readFile(talkers, 'utf-8'));

            const id = talk.length + 1;

            const body = { id, ...req.body };

            talk.push(body);

            await fs.writeFile(talkers, JSON.stringify(talk));

            res.status(CREATED_STATUS).json( body );
          });
