module.exports = {
  // 在执行数据库升级时调用的函数，创建 roles 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, FLOAT, DATE, STRING } = Sequelize;
    await queryInterface.createTable('roles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), allowNull: false },
      auth: STRING,
      sort: FLOAT(11),
      remark: STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 roles 表
  down: async queryInterface => {
    await queryInterface.dropTable('roles');
  },
};