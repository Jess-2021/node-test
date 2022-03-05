const koa = require('koa')
const mount = require('koa-mount')

const app = new koa()

app.use(
  mount('/', async function(ctx, next) {
    ctx.body = 'hello'
    const timeStart = Date.now()
    await next(timeStart)
    console.log(Date.now() - timeStart)
  })
)

app.use(
  async function(ctx, next) {
    await new Promise((res, rej) => {
      setTimeout(() => {
        ctx.body = 'hello koa!'
        res()
      }, 1000)
    })
  }
).listen(3000)
