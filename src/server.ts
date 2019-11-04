import bodyParser from 'body-parser';
import express from 'express';
import { getPuppies, getPuppy } from './middleware/puppies';

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

export default app;
