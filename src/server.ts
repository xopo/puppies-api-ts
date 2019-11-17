import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { deletePuppy, getPuppies, getPuppy, reStore, adoptPuppy } from './middleware/puppies';

const app = express();
console.log('enable cors');
// Aapp.use(cors());

app.use(cors({ origin: 'http://localhost:3000' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (_req, res) => {
    res.send('Hello Buba3!');
});

app.get('/puppies', getPuppies, (_req, res) => {
    const { puppies } = res.locals;

    res.json(puppies);
});

app.get('/puppy/:id', getPuppy, (_req, res) => {
    const { puppy } = res.locals;

    res.json(puppy);
});

app.patch('/adoptPuppy/:id', adoptPuppy, (_req, res) => {
    const { message } = res.locals;
    const status = message.type === 'success' ?  204 : 404;

    res.status(status).send(message);
});

app.delete('/puppy/:id', deletePuppy, (_req, res) => {
    const { message } = res.locals;
    const status = message.type === 'success' ?  204 : 404;

    res.status(status).send(message);
});

app.post('/restore', reStore, (_req, res) => {
    const { message } = res.locals;
    const status = message.type === 'success' ?  204 : 404;

    res.status(status).send(message);
});

export default app;
