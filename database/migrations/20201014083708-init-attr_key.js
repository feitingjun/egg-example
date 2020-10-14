module.exports = {
  up: async (queryInterface, Sequelize) => {
      const { STRING, DATE, UUID, UUIDV4, INTEGER } = Sequelize;
      await queryInterface.createTable('attr_keys', {
          id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
          category_id: UUID,
          attr_key_name: STRING,
          sort: INTEGER,
          remark: STRING,
          created_at: DATE,
          updated_at: DATE,
      });
  },
  down: async queryInterface => {
      await queryInterface.dropTable('attr_keys');
  },
};