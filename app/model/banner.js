module.exports = app => {
  const { STRING, UUID, INTEGER, UUIDV4, VIRTUAL } = app.Sequelize;

  const Banner = app.model.define('banners', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,//默认值(有UUIDV4和UUIDV1)
      primaryKey: true, //是否为主键
    },
    name: STRING,
    goods_id: UUID,
    url: STRING,
    // full_url: { //使用虚拟字段返回带完整域名的图片地址
    //   type: VIRTUAL,
    //   get() {
    //     return app.config.domainName + this.url
    //   },
    // },
    sort: INTEGER
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  Banner.associate = () => {
    app.model.Banner.belongsTo(app.model.Goods, { foreignKey: 'goods_id', as: 'goods' });
  }
  return Banner;
};