module.exports = {
  up: async (queryInterface, Sequelize) => {
      const { STRING, DATE, UUID, UUIDV4, INTEGER } = Sequelize;
      await queryInterface.createTable('attr_values', {
          id: { type: UUID, primaryKey: true, defaultValue: UUIDV4 },
          attr_key_id: {
            type: UUID,
            allowNull: false,//非空
          },
          goods_id: UUID,
          attr_value_name: {
            type: STRING,
            allowNull: false,//非空
          },
          remark: STRING,
          sort: INTEGER,
          created_at: DATE,
          updated_at: DATE,
      });
  },
  down: async queryInterface => {
      await queryInterface.dropTable('attr_values');
  },
};