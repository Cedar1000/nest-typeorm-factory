import APIFeaturesInterface from '../interfaces/apiFeatures.Interface';
import IQuery from 'interfaces/query.Interface';

class APIFeatures implements APIFeaturesInterface {
  query: Partial<IQuery>;
  payload: any;

  constructor(query: Partial<IQuery>, payload: any) {
    this.query = query;
    this.payload = payload;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B)Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.payload.where = JSON.parse(queryStr);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    // page=2&limit=10
    this.query = this.query.skip(skip).limit(limit);
    this.queryString.limit = limit;

    return this;
  }
}

module.exports = APIFeatures;
