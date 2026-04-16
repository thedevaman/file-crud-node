const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res)=>{
    const method = req.method
    const root = __dirname
    const location = path.join(root,"files",sample.txt)

    if(method === "POST")
    {
      fs.writeFileSync(location,'hrllo')
      res.writeHead(200,{'content-type':'text/plain'})
      res.end("success")
    }

    else if(method === "GET")
    {
        const text = fs.readFileSync(location,"utf-8")
        res.writeHead(200,{'content-type':'text/plain'})
        res.end(text)
    }

    else if(method === "PUT" || method ==="PATCH")
    {
        fs.appendFileSync(location,"welcome")
         res.writeHead(200,{'content-type':'text/plain'})
        res.end("file Updated")
    }

    else if(method === "DELETE")
    {
        fs.unlinkSync(location)
         res.writeHead(200,{'content-type':'text/plain'})
        res.end("file Deleted")

    }
    else{
        res.writeHead(405,{'content-type':'text/plain'})
        res.end("Method not allowed")
    }

   
    console.log(method)
res.end("data")
})
server.listen(8080)