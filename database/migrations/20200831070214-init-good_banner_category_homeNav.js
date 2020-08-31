module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DOUBLE, STRING, UUID, UUIDV4 } = Sequelize;
    await queryInterface.createTable('categorys', {
      id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
      name: STRING,
      sort: STRING
    });
    await queryInterface.createTable('banners', {
      id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
      name: STRING,
      good_id: UUID,
      url: STRING,
      sort: INTEGER
    });
    await queryInterface.createTable('goods', {
      id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
      name: STRING,
      category_id: UUID,
      price: DOUBLE(11, 2),
      original_price: DOUBLE(11, 2),
      detail: STRING(1234),
      sales: INTEGER,
      status: INTEGER,
      property: STRING(1234),
      thumb: STRING,
      recommend: INTEGER
    });
    await queryInterface.createTable('home_navs', {
      id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
      name: STRING,
      page: STRING,
      icon: STRING,
      sort: STRING,
      param: STRING
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('categorys');
    await queryInterface.dropTable('banners');
    await queryInterface.dropTable('goods');
    await queryInterface.dropTable('home_navs');
  },
};