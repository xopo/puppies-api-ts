export interface IPuppy {
    name: string;
    id: number;
    type: string;
    adopted: boolean;
}

export interface IStore {
    puppies: IPuppy[];
}
