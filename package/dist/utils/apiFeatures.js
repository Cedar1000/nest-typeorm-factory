"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const generateApiFilter_1 = require("./generateApiFilter");
const advancedFilter_1 = require("./advancedFilter");
class APIFeatures {
    constructor(query, columns) {
        this.payload = {
            skip: 10,
            take: 10,
            order: {},
            where: [],
            select: [],
        };
        this.query = query;
        this.columns = columns;
    }
    filter() {
        const queryObj = { ...this.query };
        const properties = this.columns.reduce((acc, column) => {
            acc[column] = column;
            return acc;
        }, {});
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
        Object.keys(queryObj).forEach((el) => {
            if (!properties[el])
                delete queryObj[el];
        });
        const filter = (0, generateApiFilter_1.default)(queryObj);
        this.payload.where = filter;
        return this;
    }
    sort() {
        if (this.query.sort) {
            const sortBy = this.query.sort.split(',');
            sortBy.forEach((el) => {
                const [order, field] = el.split('-');
                this.payload.order[field] = order.toUpperCase();
                this.payload.order.id = order.toUpperCase();
            });
        }
        else {
            this.payload.order = { createdAt: 'DESC', id: 'DESC' };
        }
        return this;
    }
    limitFields() {
        if (this.query.fields) {
            const fields = this.query.fields.split(',');
            this.payload.select = fields;
        }
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.payload.skip = skip;
        this.payload.take = limit;
        return this;
    }
    search() {
        if (this.query.search) {
            this.payload = (0, advancedFilter_1.default)(this.payload, this.query, 'search');
        }
        return this;
    }
    relations() {
        if (this.query.relations) {
            const relations = this.query.relations.split(',');
            this.payload.relations = relations;
        }
        return this;
    }
    gt() {
        if (this.query.gt) {
            this.payload = (0, advancedFilter_1.default)(this.payload, this.query, 'gt');
        }
        return this;
    }
    lt() {
        if (this.query.lt) {
            this.payload = (0, advancedFilter_1.default)(this.payload, this.query, 'lt');
        }
        return this;
    }
    gte() {
        if (this.query.gte) {
            this.payload = (0, advancedFilter_1.default)(this.payload, this.query, 'gte');
        }
        return this;
    }
    lte() {
        if (this.query.lte) {
            this.payload = (0, advancedFilter_1.default)(this.payload, this.query, 'lte');
        }
        return this;
    }
    range() {
        if (this.query.range) {
            const [term, range] = this.query.range.split(',');
            const [lowerRange, upperRange] = range.split('-');
            const clone = [...this.payload.where];
            const result = clone.map((el) => ({
                ...el,
                [term]: (0, typeorm_1.Between)(+lowerRange, +upperRange),
            }));
            this.payload.where = result;
        }
        return this;
    }
}
exports.default = APIFeatures;
//# sourceMappingURL=apiFeatures.js.map