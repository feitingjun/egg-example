module.exports = {
  up: async (queryInterface, Sequelize) => {
      const { INTEGER, DATE, UUID, UUIDV4 } = Sequelize;
      await queryInterface.createTable('collects', {
          id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
          uid: UUID,
          type: INTEGER, // 1商品
          record_id: UUID,
          created_at: DATE,
          updated_at: DATE,
      });
  },
  down: async queryInterface => {
      await queryInterface.dropTable('collects');
  },
};