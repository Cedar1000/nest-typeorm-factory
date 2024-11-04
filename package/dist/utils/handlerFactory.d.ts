import IQuery from '../interfaces/query.Interface';
export declare const getAll: (Repo: any, query: Partial<IQuery>) => Promise<{
    status: string;
    total: any;
    nextPage: number;
    prevPage: number;
    count: any;
    pages: number;
    currentPage: number;
    data: any;
}>;
export declare const getOne: (Repo: any, id: string, query: Partial<IQuery>) => Promise<{
    status: string;
    data: any;
}>;
export declare const createOne: (Repo: any, payload: any) => Promise<{
    status: string;
    data: any;
}>;
export declare const updateOneOne: (Repo: any, id: string, payload: any) => Promise<{
    status: string;
    data: any;
}>;
export declare const deleteOne: (Repo: any, id: string) => Promise<any>;
