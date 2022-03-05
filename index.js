let express = require('express')

const app = express()

app.listen(3000)

app.get('/', function(req, res, next){
  res.send('hello!')
  next()

  // 可以继续添加逻辑， 洋葱模型
}, function(req, res) {
  console.log(res)
})