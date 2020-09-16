module.exports = {
  // 在执行数据库升级时调用的函数
  up: async (queryInterface, Sequelize) => {
      const { STRING } = Sequelize;
      //新增字段
      await queryInterface.addColumn('home_navs', 'page_name', STRING);
  },
  // 在执行数据库降级时调用的函数
  down: async (queryInterface, Sequelize) => {
      //删除字段
      await queryInterface.removeColumn('home_navs', 'page_name');
  },
};