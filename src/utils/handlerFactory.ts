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

// exports.getOne = (Model, popOptions) =>
//   catchAsync(async (req, res, next) => {
//     let query = Model.findById(req.params.id);
//     if (popOptions) query = query.populate(popOptions);
//     const doc = await query;

//     if (!doc) {
//       return next(new AppError('No document found with that ID', 404));
//     }

//     doc.canReview = req.body.canReview;

//     res.status(200).json({
//       status: 'success',
//       doc,
//       canReview: req.body.canReview,
//     });
//   });

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
