module.exports = {
    // 在执行数据库升级时调用的函数，创建 users 表
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING } = Sequelize;
        await queryInterface.addColumn('users', 'age', INTEGER);
        await queryInterface.addColumn('users', 'email', STRING(30));
    },
    // 在执行数据库降级时调用的函数
    down: async (queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING } = Sequelize;
        //删除字段
        await queryInterface.removeColumn('users', 'age');
        await queryInterface.removeColumn('users', 'email');
    },
};