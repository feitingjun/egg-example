module.exports = app => {
  require('./admin')(app);
  require('./weapp.js')(app);
};