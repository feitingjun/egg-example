module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
      const { INTEGER, STRING, UUID, UUIDV4, DATE } = Sequelize;
      await queryInterface.createTable('weapp_users', {
        id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
        openid: STRING,
        nick_name: STRING,
        avatar_url: STRING,
        gender: INTEGER,
        country: STRING,
        province: STRING,
        city: STRING,
        login_at: DATE,
        created_at: DATE,
        updated_at: DATE,
      });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
      await queryInterface.dropTable('weapp_users');
  },
};