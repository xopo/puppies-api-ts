import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import path from 'path';
import { IStore } from 'src/types/types';
import * as util from 'util';

const readFileSync = util.promisify(fs.readFile);
const storePath = path.join(__dirname, '/../../store/store.json');

const getStoreData = async (): Promise<IStore> => {
    const data = await readFileSync(storePath, 'utf-8');
    return JSON.parse(data);
};

const getPuppies = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const { puppies } = await getStoreData();

        res.locals = {
            ...res.locals,
            puppies
        };
        next();
    } catch (er) {
        console.log(er);
    }
};

const getPuppy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { params: { id } } = req;
        if (id) {
            const { puppies } = await getStoreData();
            const puppy = puppies.find((apuppy) => apuppy.id === parseInt(id, 10));

            res.locals = {
                ...res.locals,
                puppy
            };
            next();
        }
    } catch (er) {
        console.log(er);
    }
};

export {
    getPuppies,
    getPuppy
};
