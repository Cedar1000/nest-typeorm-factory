import operators from './operators.dictionary';

import IQuery from 'interfaces/query.Interface';
import IPayload from 'src/interfaces/payload.Interface';

const advancedFilter = (
  payload: Partial<IPayload>,
  query: IQuery,
  operator: string,
) => {
  const searches = query[operator].split('-');
  const clone = [...payload.where];

  const result = [];

  searches.forEach((el: string) => {
    const [field, term] = el.split(',');

    clone.forEach((_, index) => {
      result.push({ ...clone[index], [field]: operators[operator](term) });
    });

    payload.where = result;
  });

  return payload;
};

export default advancedFilter;
