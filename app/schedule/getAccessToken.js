const fs = require('fs');
const colors = require('colors');
module.exports = {
  schedule: {
    interval: '115m',
    immediate: true,
    type: 'worker',
  },
  async task(ctx) {
    ctx.service.accessToken.index();
  },
}