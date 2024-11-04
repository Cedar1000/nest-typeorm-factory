"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOneOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const apiFeatures_1 = require("./apiFeatures");
const common_1 = require("@nestjs/common");
const getAll = async (Repo, query) => {
    console.log(Repo);
    const payload = new apiFeatures_1.default(query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .search()
        .relations().payload;
    const limit = query.limit ? +query.limit : 10;
    const page = query.page ? +query.page : 1;
    const result = await Repo.find(payload);
    const count = await Repo.count(payload);
    const pages = Math.ceil(count / +limit);
    const nextPage = +page < pages ? +page * 1 + 1 : null;
    const prevPage = +page > 1 ? +page - 1 : null;
    return {
        status: 'success',
        total: result.length,
        nextPage,
        prevPage,
        count,
        pages,
        currentPage: page,
        data: result,
    };
};
exports.getAll = getAll;
const getOne = async (Repo, id, query) => {
    const { relations } = query;
    const payload = { where: { id } };
    if (relations)
        payload.relations = relations.split(',');
    const [result] = await Repo.find(payload);
    if (!result)
        throw new common_1.NotFoundException('No resource with that ID');
    return { status: 'success', data: result };
};
exports.getOne = getOne;
const createOne = async (Repo, payload) => {
    const data = Repo.create(payload);
    const result = await Repo.save(data);
    return { status: 'success', data: result };
};
exports.createOne = createOne;
const updateOneOne = async (Repo, id, payload) => {
    const data = await Repo.findOneBy({ id });
    if (!data)
        throw new common_1.NotFoundException('No resource with that ID');
    await Repo.update({ id }, payload);
    const saved = await Repo.findOneBy({ id });
    return { status: 'success', data: saved };
};
exports.updateOneOne = updateOneOne;
const deleteOne = async (Repo, id) => {
    const data = await Repo.findOneBy({ id });
    if (!data)
        throw new common_1.NotFoundException('No resource with that ID');
    return Repo.delete({ id });
};
exports.deleteOne = deleteOne;
//# sourceMappingURL=handlerFactory.js.map