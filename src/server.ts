import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as action from './middleware/puppies';

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use((req, res) => {
//     console.log(req.body); 
//     res.on("finish", () => {
//       console.log(res);
//     });
//   });

app.get('/', (_req, res) => {
    res.send('Hello Buba3!');
});

app.get('/puppies', action.getPuppies, (_req, res) => {
    const { puppies } = res.locals;

    res.json(puppies);
});

app.get('/puppy/:id', action.getPuppy, (_req, res) => {
    const { puppy } = res.locals;

    res.json(puppy);
});

app.post('/puppy', action.addPuppy, (_req, res) => {
    const { newPuppy } = res.locals;

    res.json(newPuppy);
});

app.delete('/puppy/:id', action.deletePuppy, (_req, res) => {
    const { message } = res.locals;
    const status = message.type === 'success' ?  204 : 404;

    res.send(message.body).status(status);
});

app.post('/restore', action.reStore, (_req, res) => {
    const { message } = res.locals;
    const status = message.type === 'success' ?  204 : 404;

    res.status(status).send(message);
});

app.patch('/adoptPuppy/:id', action.adoptPuppy, (_req, res) => {
    const { puppy } = res.locals;
    const status = puppy ?  204 : 404;

    res.send(puppy).status(status);
});



export default app;