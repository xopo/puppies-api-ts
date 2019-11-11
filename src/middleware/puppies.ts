import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import path from 'path';
import { IMessage, IPuppy, IStore } from 'src/types/types';
import * as util from 'util';

const readFileSync = util.promisify(fs.readFile);
const storePath = path.join(__dirname, '/../../store/store.json');
const reStorePath = path.join(__dirname, '/../../store/reset.json');

const getStoreData = async (aPath=storePath): Promise<IStore> => {
    const data = await readFileSync(aPath, 'utf-8');
    return JSON.parse(data);
};

const writeStoreData = async (puppies: IPuppy[]): Promise<void> => {
    const data = await getStoreData();
    const newData = {
        ...data,
        puppies
    };
    const content = JSON.stringify(newData, null, 4);
    await fs.writeFileSync(storePath, content, 'utf8');
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

const reStore = async (_req: Request, _res: Response, next: NextFunction) => {
    const { puppies: restorePuppies } = await getStoreData(reStorePath);
    writeStoreData(restorePuppies);
    next();
}

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

const deletePuppy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { params: { id } } = req;
        if (id) {
            const { puppies } = await getStoreData();
            let message: IMessage;
            const targetPuppyIndex = puppies.findIndex((apuppy) => apuppy.id === parseInt(id, 10));

            if (targetPuppyIndex > -1) {
                const puppy = puppies.splice(targetPuppyIndex, 1);

                writeStoreData(puppies);
                message = {
                    body: `${puppy[0].name} - remove with success`,
                    type: 'success'
                };
            } else {
                message = {
                    body: `could not find a puppy with id = ${id}`,
                    type: 'error'
                };
            }

            res.locals = {
                ...res.locals,
                message
            };
            next();
        }
    } catch (er) {
        console.log(er);
    }
};

export {
    deletePuppy,
    getPuppies,
    getPuppy,
    reStore
};
