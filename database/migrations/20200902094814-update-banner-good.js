module.exports = {
  // 在执行数据库升级时调用的函数
  up: async (queryInterface, Sequelize) => {
      //重命名字段名
      await queryInterface.renameColumn('banners', 'good_id', 'goods_id');
  },
  // 在执行数据库降级时调用的函数
  down: async (queryInterface, Sequelize) => {
      await queryInterface.renameColumn('banners', 'goods_id', 'good_id');
  },
};