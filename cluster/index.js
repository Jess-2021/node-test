const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
  for(let i = 0; i < os.cpus().length / 2; i++) {
    cluster.fork()

    // 监测是否存在僵尸进程
    let missedPing = 0
    setInterval(() => {
      worker.send('ping')
      missedPing++
    }, 3000)

    worker.on('message', msg => {
      if (msg === 'pong') {
        console.log('pong')
        missedPing--
      }
    })

    cluster.on('exit', () => {

      // 延迟重启
      setTimeout(() => {
        cluster.fork()
      }, 5000)
    })
  }
} else {
  require('./app.js')

  process.on('message', str => {
    if (str === 'ping') {
      process.send('pong')
    }
  })

  process.on('uncaughtException', err => {
    console.log(err)

    // 需要退出，不然会让出问题的服务继续运行
    process.exit(1)
  })
  setInterval(() => {
    if (process.memoryUsage().rss > 734003200) {
      console.log('存在内存泄漏')
      // 存在内存泄漏，配合exit监听函数重启
      process.exit(1)
    }
  }, 5000)

}