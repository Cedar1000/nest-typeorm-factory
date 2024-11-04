import {
  Like,
  Between,
  MoreThan,
  LessThan,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';

const operatorsDictionary = {
  search: (term: string) => Like(`%${term}%`),
  gt: (term: number) => MoreThan(term),
  lt: (term: number) => LessThan(term),
  lte: (term: number) => LessThanOrEqual(term),
  gte: (term: number) => MoreThanOrEqual(term),
  range: (num1: number, num2: number) => Between(num1, num2),
};

export default operatorsDictionary;
