"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateApiFilter = (query) => {
    const keys = Object.keys(query);
    const values = Object.values(query);
    const valueArrays = values.map((value) => value.split(','));
    const filter = [];
    const generate = (index, combination) => {
        if (index === keys.length) {
            filter.push(combination);
            return;
        }
        const key = keys[index];
        const keyValues = valueArrays[index];
        for (const value of keyValues) {
            const updatedCombination = { ...combination };
            const boleans = ['true', 'false'];
            updatedCombination[key] = boleans.includes(value)
                ? JSON.parse(value)
                : value;
            generate(index + 1, updatedCombination);
        }
    };
    generate(0, {});
    return filter;
};
exports.default = generateApiFilter;
//# sourceMappingURL=generateApiFilter.js.map