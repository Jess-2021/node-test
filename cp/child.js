process.on('message', str => {
  console.log(str)
  process.send('this is child')
})