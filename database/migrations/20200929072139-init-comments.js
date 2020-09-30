module.exports = {
  up: async (queryInterface, Sequelize) => {
      const { STRING, DATE, UUID, UUIDV4 } = Sequelize;
      await queryInterface.createTable('comments', {
          id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
          goods_id: UUID,
          pid: UUID,
          from_uid: UUID,
          to_uid: UUID,
          content: STRING,
          picture: STRING,
          created_at: DATE,
          updated_at: DATE,
      });
  },
  down: async queryInterface => {
      await queryInterface.dropTable('comments');
  },
};