const http = require('http')
const server = http.createServer((req,res)=>{
res.end("data")
})
server.listen(8080)