import bodyParser from 'body-parser';
import express from 'express';
import { deletePuppy, getPuppies, getPuppy, reStore } from './middleware/puppies';

const app = express();

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

app.delete('/puppy/:id', deletePuppy, (_req, res) => {
    const { message } = res.locals;
    const status = message.type === 'success' ?  204 : 404;

    res.status(status).send(message);
});

app.post('/restore', reStore, (_req, res) => {
    const { message } = res.locals;
    const status = message.type === 'success' ?  204 : 404;

    res.status(status).send(message);
})


export default app;
