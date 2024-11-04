import APIFeatures from './apiFeatures';
import IQuery from '../interfaces/query.Interface';

import IPayload from '../interfaces/payload.Interface';

import { NotFoundException } from '@nestjs/common';

export const getAll = async (Repo: any, query: Partial<IQuery>) => {
  console.log(Repo);
  const payload: Partial<IPayload> = new APIFeatures(query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .search()
    .relations().payload;

  // console.log(JSON.stringify(payload));

  const limit = query.limit ? +query.limit : 10;

  const page = query.page ? +query.page : 1;

  const result = await Repo.find(payload);

  const count = await Repo.count(payload);

  const pages = Math.ceil(count / +limit);

  const nextPage = +page < pages ? +page * 1 + 1 : null;

  const prevPage = +page > 1 ? +page - 1 : null;

  return {
    status: 'success',
    total: result.length,
    nextPage,
    prevPage,
    count,
    pages,
    currentPage: page,
    data: result,
  };
};

export const getOne = async (Repo: any, id: string, query: Partial<IQuery>) => {
  const { relations } = query;

  const payload: any = { where: { id } };

  if (relations) payload.relations = relations.split(',');

  const [result] = await Repo.find(payload);

  if (!result) throw new NotFoundException('No resource with that ID');

  return { status: 'success', data: result };
};

export const createOne = async (Repo: any, payload: any) => {
  const data = Repo.create(payload);
  const result = await Repo.save(data);

  return { status: 'success', data: result };
};

export const updateOneOne = async (Repo: any, id: string, payload: any) => {
  const data = await Repo.findOneBy({ id });

  if (!data) throw new NotFoundException('No resource with that ID');

  await Repo.update({ id }, payload);

  const saved = await Repo.findOneBy({ id });

  return { status: 'success', data: saved };
};

export const deleteOne = async (Repo: any, id: string) => {
  const data = await Repo.findOneBy({ id });

  if (!data) throw new NotFoundException('No resource with that ID');
  return Repo.delete({ id });
};
