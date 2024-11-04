"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const operatorsDictionary = {
    search: (term) => (0, typeorm_1.Like)(`%${term}%`),
    gt: (term) => (0, typeorm_1.MoreThan)(term),
    lt: (term) => (0, typeorm_1.LessThan)(term),
    lte: (term) => (0, typeorm_1.LessThanOrEqual)(term),
    gte: (term) => (0, typeorm_1.MoreThanOrEqual)(term),
    range: (num1, num2) => (0, typeorm_1.Between)(num1, num2),
};
exports.default = operatorsDictionary;
//# sourceMappingURL=operators.dictionary.js.map