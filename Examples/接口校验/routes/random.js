var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = {
    "data": [{
        name: '赵晓晓',
        age: '27',
        sex: '女',
        pay: '8000'
      },
      {
        name: '钱花花',
        age: '24',
        sex: '女',
        pay: '21000'
      },
      {
        name: '孙莎莎',
        age: '24',
        sex: '女',
        pay: '6000'
      },
      {
        name: '李飒',
        age: '27',
        sex: '男',
        pay: '12000'
      }
    ]
  }
});

module.exports = router;
