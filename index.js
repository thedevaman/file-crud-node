const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const server = http.createServer((req,res)=>{
    const method = req.method
    const root = __dirname
    // const location = path.join(root,"files","sample.txt")

    if(method === "POST")
    {

        req.on('data',(chunks)=>{
            data = chunks.toString()
            // console.log(chunks.toString())
        })

        req.on('end',()=>{
            const payload = JSON.parse(data)
            const location = path.join(root,"files",payload.filename)

            const isFile = fs.existsSync(location)
            if(!isFile)
            {
              fs.writeFileSync(location,payload.content)
              res.writeHead(200,{'content-type':'text/plain'})
              res.end(`${payload.filename} created !`)
            }else{
                res.end("file already exist")
            }

           
            // console.log(payload.filename)
        })


        // res.end("data")

    //   const isFile = fs.existsSync(location)
    //   if(!isFile)  
    //   {
    //   fs.writeFileSync(location,'hrllo')
    //   res.writeHead(200,{'content-type':'text/plain'})
    //   res.end("success")
    //   }else{
    //     res.end("file already exist")
    //   }
    }

    else if(method === "GET")
    {
        const uu = req.url
        const {query} = url.parse(uu,true)
       const filename = query.filename

      const location = path.join(root,"files",filename)
      const isFile= fs.existsSync(location)
      if(isFile)
      {
       const content = fs.readFileSync(location,"utf-8")
       res.end(content)
      }else{
        res.writeHead(404,{"content-type":"text/plain"})
        res.end("file not found!")
      }
      

        // res.end("hello")

        // const text = fs.readFileSync(location,"utf-8")
        // res.writeHead(200,{'content-type':'text/plain'})
        // res.end(text)
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
})
server.listen(8080)