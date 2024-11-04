import IQuery from '../interfaces/query.Interface';
import IPayload from 'src/interfaces/payload.Interface';
declare const advancedFilter: (payload: Partial<IPayload>, query: IQuery, operator: string) => Partial<IPayload>;
export default advancedFilter;
