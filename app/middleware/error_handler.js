module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next();
            const { data, message } = ctx.body;
            ctx.body = {
                code: 200,
                data,
                message
            }
        } catch (err) {
            // 返回status不能用ctx.status,因为在请求无ctx.body时(即手动抛出异常)会抛出404，接口未找到404在notfound_handler中间件中将err.status定义为404
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            ctx.app.emit('error', err, ctx);
            let message = null, status = err.status || 500;
            switch(err.name){
                case "SequelizeValidationError":
                    message = "验证失败";
                    if(err.errors) message =  `${err.errors.map(v=>v.message).join(",")}`;
                    break;
                case "SequelizeDatabaseError":
                    message = "数据库错误";
                    break;
                case "SequelizeTimeoutError":
                    message = "查询超时";
                    break;
                case "SequelizeUniqueConstraintError":
                    message = "已存在";
                    break;
                case "SequelizeExclusionConstraintError":
                    message = "排除约束错误";
                    break;
                case "SequelizeForeignKeyConstraintError":
                    message = "外键约束错误";
                    break;
                case "SequelizeConnectionError":
                    message = "连接数据库错误";
                    break;
                case "SequelizeConnectionRefusedError":
                    message = "连接数据库被拒绝";
                    break;
                case "SequelizeAccessDeniedError":
                    message = "没有权限访问数据库";
                    break;
                case "SequelizeHostNotFoundError":
                    message = "未找到主机";
                    break;
                case "SequelizeInvalidConnectionError":
                    message = "无效链接";
                    break;
                case "SequelizeConnectionTimedOutError":
                    message = "链接数据库超时";
                    break;
                case "SequelizeInstanceError":
                    message = "实例错误";
                    break;
                default:
                    if(err.status === 404) {
                        message = `请求路径未找到  ${ctx.method} ${ctx.url}`;
                        break;
                    }
                    if(err.status === 401) {
                        message = `未登录`;
                        break;
                    }
                    if(!err.status){
                        message = err.message;
                        break;
                    }
                    message = err.message;
            }
            ctx.status = status;
            ctx.body = {
                data: null,
                code: 0,
                message: message
            }
        }
    };
};