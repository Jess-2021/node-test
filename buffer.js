const buffer1 = Buffer.from('Jess')
const buffer2 = Buffer.from([1,2,3,4])

const buffer3 = Buffer.alloc(20) // 创建一个长度为20的buffer

buffer2.writeInt8(12, 1)
buffer2.writeInt16LE(12, 2)
console.log(buffer2)

// 对于对象字段的存储
const protoBuf = require('protocol-buffers');
const fs = require('fs');

const schema = protoBuf(fs.readFileSync(__dirname + '/test.proto', 'utf-8'))
// console.log(schema)

const bufferJess = schema.Jess.encode({
  id: 1,
  name: 'Jess',
  company: 'huya'
})

console.log(schema.Jess.decode(bufferJess))