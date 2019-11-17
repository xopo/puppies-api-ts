import { getPuppies,  getPuppy } from '../middleware/puppies';
import { Request, Response } from 'express';

const next = jest.fn();
const res = {} as Response;
const req = {} as Request;

xdescribe('middleware', () => {
    fit('gets a list of  puppies', () => {
        const puppies = getPuppies(req, res, next);
        console.log(puppies);

    });
    it('gets a list of  puppies', () => {
        const puppies = getPuppy(req, res, next);
        console.log(puppies);

    });
})