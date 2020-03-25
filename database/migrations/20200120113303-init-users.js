module.exports = {
    // 在执行数据库升级时调用的函数，创建 users 表
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING } = Sequelize;
        // 修改字段属性
        // await queryInterface.changeColumn('users', 'name', INTEGER);
        //新增字段
        await queryInterface.addColumn('users', 'sex', INTEGER);
        //删除字段
        await queryInterface.removeColumn('users', 'age');
    },
    // 在执行数据库降级时调用的函数
    down: async (queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING } = Sequelize;
        //删除字段
        await queryInterface.removeColumn('users', 'sex');
        //新增字段
        await queryInterface.addColumn('users', 'age', INTEGER);
    },
};