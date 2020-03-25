const toInt = str => {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}
module.exports = {
    // 分页查询
    async queryPager(query, model, isPage=true) {
        const ctx = this.ctx;
        const pageSize = toInt(ctx.query.pageSize) || 10;
        const pageIndex = ctx.query.pageIndex && ctx.query.pageIndex > 0 ? ctx.query.pageIndex : 1;
        const offset = (pageIndex - 1) * pageSize;
        if(isPage) query = { limit: pageSize, offset, ...query };
        const { rows: data, count: total } = await ctx.model[model].findAndCountAll(query);
        const page = isPage ? {
            pageIndex, pageSize
        } : {}
        return { data, total, ...page };
    },
};