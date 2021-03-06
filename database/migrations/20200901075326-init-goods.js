module.exports = {
  // 在执行数据库升级时调用的函数
  up: async (queryInterface, Sequelize) => {
      const { STRING } = Sequelize;
      //新增字段
      await queryInterface.addColumn('goods', 'code', STRING);
      await queryInterface.addColumn('goods', 'banner', STRING);
  },
  // 在执行数据库降级时调用的函数
  down: async (queryInterface, Sequelize) => {
      //删除字段
      await queryInterface.removeColumn('goods', 'code');
      await queryInterface.removeColumn('goods', 'banner');
  },
};