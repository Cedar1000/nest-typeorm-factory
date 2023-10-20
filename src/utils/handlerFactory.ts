import APIFeatures from './apiFeatures';
import IQuery from 'interfaces/query.Interface';

import IPayload from 'src/interfaces/payload.Interface';

export const getAll = (Repo: any, query: Partial<IQuery>) => {
  const payload: Partial<IPayload> = new APIFeatures(query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .search().payload;

  return Repo.find(payload);
};

export const getOne = (Repo: any, id: string) => {
  return Repo.findOneBy({ id });
};

export const createOne = (Repo: any, payload: any) => {
  const data = Repo.create(payload);
  return Repo.save(data);
};

export const updateOneOne = async (Repo: any, id: string, payload: any) => {
  const data = await Repo.findOneBy({ id });

  const result = { ...data, ...payload };

  return Repo.save(result);
};

export const deleteOne = (Repo: any, id: string) => {
  return Repo.delete({ id });
};
