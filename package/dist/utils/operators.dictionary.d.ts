declare const operatorsDictionary: {
    search: (term: string) => import("typeorm").FindOperator<string>;
    gt: (term: number) => import("typeorm").FindOperator<number>;
    lt: (term: number) => import("typeorm").FindOperator<number>;
    lte: (term: number) => import("typeorm").FindOperator<number>;
    gte: (term: number) => import("typeorm").FindOperator<number>;
    range: (num1: number, num2: number) => import("typeorm").FindOperator<number>;
};
export default operatorsDictionary;
