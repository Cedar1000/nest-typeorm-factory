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

  console.log(payload);

  return Repo.find(payload);
};

export const getOne = (Repo: any, id: string) => {
  return Repo.findOneBy({ id });
};

export const createOne = (Repo: any, payload: any) => {
  const data = Repo.create(payload);
  return Repo.save(data);
};

export const updateOneOne = (Repo: any, filter: any, payload: any) => {
  return Repo.update(filter, payload);
};

// exports.deleteOne = (Model) => {
//   return catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const document = await Model.findOneAndDelete({ _id: id });

//     if (!document) {
//       return next(new AppError('No document Found With That ID', 404));
//     }

//     res.status(204).json({
//       status: 'Success',
//       data: null,
//     });
//   });
// };

// exports.updateOne = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const doc = await Model.findOneAndUpdate({ _id: id }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!doc) {
//       return next(new AppError(`Can't find document with id: ${id}.`, 404));
//     }

//     res.status(200).json({
//       status: 'success',
//       data: {
//         data: doc,
//       },
//     });
//   });

// exports.createOne = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.create(req.body);
//     res.status(201).json({
//       status: 'Created',
//       doc,
//     });
//   });
