module.exports = {
  // 在执行数据库升级时调用的函数
  up: async (queryInterface, Sequelize) => {
      const { INTEGER, DATE, STRING, UUID, UUIDV4 } = Sequelize;
      await queryInterface.createTable('home_nav_data', {
        id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
        name: STRING,
        page: STRING,
        param: STRING,
        created_at: DATE,
        updated_at: DATE,
      });
  },
  // 在执行数据库降级时调用的函数
  down: async queryInterface => {
      await queryInterface.dropTable('home_nav_data');
  },
};