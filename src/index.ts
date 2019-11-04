import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import { getPuppies, getPuppy } from './middleware/puppies';

// initialize config based on .env
dotenv.config();
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const port = process.env.SERVER_PORT || 8083;

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

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server starterd at http://localhost:${port}`);
});
