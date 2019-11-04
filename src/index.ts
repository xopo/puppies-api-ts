import dotenv from 'dotenv';
import app from './server';

// initialize config based on .env
dotenv.config();

const port = process.env.SERVER_PORT || 8083;

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server starterd at http://localhost:${port}`);
});
