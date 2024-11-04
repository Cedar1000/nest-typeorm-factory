interface IQuery {
  sort?: string;
  fields?: string;
  page?: string;
  limit?: string;
  search?: string;
  relations?: string;
  gt?: string;
  lt?: string;
  gte?: string;
  lte?: string;
  range?: string;
}

export default IQuery;
