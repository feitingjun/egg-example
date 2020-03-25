module.exports = {
    // 在执行数据库升级时调用的函数，创建 users 表
    up: async (queryInterface, Sequelize) => {
        const { UUID, STRING } = Sequelize;
        //更改字段属性
        await queryInterface.changeColumn('users', 'id', UUID);
        //重命名字段名
        await queryInterface.renameColumn('users', 'name', 'username');
        await queryInterface.addColumn('users', 'password', STRING(30));
    },
    // 在执行数据库降级时调用的函数
    down: async (queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING } = Sequelize;
        //更改字段属性
        await queryInterface.changeColumn('users', 'id', INTEGER);
        await queryInterface.renameColumn('users', 'username', 'name');
        //删除字段
        await queryInterface.removeColumn('users', 'password');
    },
};