const { Console } = require('console')
const net = require('net')

const socket = new net.Socket({})

socket.connect({
  host: '127.0.0.1',
  port: 4000
})


let seq = 0
const buf = encode()
socket.write(buf)
socket.on('data', (buffer) => {
  const seq1 = buffer.slice(0, 2)
  const res = buffer.slice(2)
  console.log(seq1.readInt16BE(), res.toString('utf-8'))
  socket.write(encode())
})

function encode() {
  let buf = Buffer.alloc(6)
  buf.writeInt16BE(seq)
  buf.writeInt32BE(Math.floor(Math.random() * 10), 2)
  seq += 1

  return buf
}