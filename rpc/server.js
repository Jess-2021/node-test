const net = require('net')

const server = net.createServer((socket) => {

  socket.on('data', function(buffer) {
    const seq = buffer.slice(0, 2)
    const params = buffer.readInt32BE(2)

    setTimeout(() => {
      const randomData = Math.floor(params * Math.random() * 100).toString()
      const data = Buffer.concat([seq, Buffer.from(randomData)])
      console.log(data, randomData)
      socket.write(data)
    }, 500)
  })
})

server.listen(4000)