"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_dictionary_1 = require("./operators.dictionary");
const advancedFilter = (payload, query, operator) => {
    const searches = query[operator].split('-');
    const clone = [...payload.where];
    const result = [];
    searches.forEach((el) => {
        const [field, term] = el.split(',');
        clone.forEach((_, index) => {
            result.push({ ...clone[index], [field]: operators_dictionary_1.default[operator](term) });
        });
        payload.where = result;
    });
    return payload;
};
exports.default = advancedFilter;
//# sourceMappingURL=advancedFilter.js.map