const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)

    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    let { page, limit } = req.query;
    page = page ? page * 1 : 1;
    limit = limit ? limit * 1 : 10;
    const queryObj = { ...req.query, page, limit };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B)Advanced Filtering

    const count = await Model.count(queryObj);

    const doc = await features.query;
    const total = Math.ceil(count / limit);

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      total_pages: total,
      page,
      next_page: page * 1 < total ? page * 1 + 1 : null,
      prev: page * 1 > 1 ? page * 1 - 1 : null,
      doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    doc.canReview = req.body.canReview;

    res.status(200).json({
      status: 'success',
      doc,
      canReview: req.body.canReview,
    });
  });

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findOneAndDelete({ _id: id });

    if (!document) {
      return next(new AppError('No document Found With That ID', 404));
    }

    res.status(204).json({
      status: 'Success',
      data: null,
    });
  });
};

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError(`Can't find document with id: ${id}.`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'Created',
      doc,
    });
  });
