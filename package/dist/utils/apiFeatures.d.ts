import APIFeaturesInterface from '../interfaces/apiFeatures.Interface';
import IQuery from '../interfaces/query.Interface';
import IPayload from '../interfaces/payload.Interface';
declare class APIFeatures implements APIFeaturesInterface {
    query: Partial<IQuery>;
    payload: Partial<IPayload>;
    constructor(query: Partial<IQuery>);
    filter(): this;
    sort(): this;
    limitFields(): this;
    paginate(): this;
    search(): this;
    relations(): this;
    gt(): this;
    lt(): this;
    gte(): this;
    lte(): this;
    range(): this;
}
export default APIFeatures;
