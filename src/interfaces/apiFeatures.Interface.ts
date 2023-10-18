import IQuery from '../interfaces/query.Interface';

interface APIFeatures {
  filter(): this;
  sort(): IQuery;
  paginate(): IQuery;
}

export default APIFeatures;
