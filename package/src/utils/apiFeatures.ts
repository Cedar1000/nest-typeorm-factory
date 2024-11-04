import { Between } from 'typeorm';

import APIFeaturesInterface from '../interfaces/apiFeatures.Interface';
import IQuery from '../interfaces/query.Interface';
import IPayload from '../interfaces/payload.Interface';
import generateApiFilter from './generateApiFilter';
import advancedFilter from './advancedFilter';

class APIFeatures implements APIFeaturesInterface {
  query: Partial<IQuery>;
  payload: Partial<IPayload> = {
    skip: 10,
    take: 10,
    order: {},
    where: [],
    select: [],
  };

  constructor(query: Partial<IQuery>) {
    this.query = query;
  }

  filter(): this {
    const queryObj = { ...this.query };
    const excludedFields = [
      'gt',
      'lt',
      'gte',
      'lte',
      'page',
      'sort',
      'range',
      'limit',
      'fields',
      'search',
      'relations',
    ];

    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B)Advanced Filtering

    const filter = generateApiFilter(queryObj);

    this.payload.where = filter;

    return this;
  }

  sort(): this {
    if (this.query.sort) {
      const sortBy = this.query.sort.split(',');

      sortBy.forEach((el: string) => {
        const [order, field] = el.split('-');
        this.payload.order[field] = order.toUpperCase();
        this.payload.order.id = order.toUpperCase();
      });
    } else {
      this.payload.order = { createdAt: 'DESC', id: 'DESC' };
    }

    return this;
  }

  limitFields(): this {
    if (this.query.fields) {
      const fields = this.query.fields.split(',');
      this.payload.select = fields;
    }

    return this;
  }

  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    // page=2&limit=10
    this.payload.skip = skip;
    this.payload.take = limit;

    return this;
  }

  search(): this {
    if (this.query.search) {
      this.payload = advancedFilter(this.payload, this.query, 'search');
    }

    return this;
  }

  relations(): this {
    if (this.query.relations) {
      const relations = this.query.relations.split(',');
      this.payload.relations = relations;
    }

    return this;
  }

  gt(): this {
    //?gt=age,5-posts,10
    if (this.query.gt) {
      this.payload = advancedFilter(this.payload, this.query, 'gt');
    }
    return this;
  }

  lt(): this {
    //?gt=age,5-posts,10
    if (this.query.lt) {
      this.payload = advancedFilter(this.payload, this.query, 'lt');
    }
    return this;
  }

  gte(): this {
    //?gt=age,5-posts,10
    if (this.query.gte) {
      this.payload = advancedFilter(this.payload, this.query, 'gte');
    }
    return this;
  }

  lte(): this {
    //?gt=age,5-posts,10
    if (this.query.lte) {
      this.payload = advancedFilter(this.payload, this.query, 'lte');
    }
    return this;
  }

  range(): this {
    // ?range=age,3-10
    if (this.query.range) {
      const [term, range] = this.query.range.split(',');

      const [lowerRange, upperRange] = range.split('-');

      const clone = [...this.payload.where];

      const result = clone.map((el) => ({
        ...el,
        [term]: Between(+lowerRange, +upperRange),
      }));

      this.payload.where = result;
    }
    return this;
  }
}

export default APIFeatures;
