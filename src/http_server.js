const http = require('http');
const server= http.createServer((req,res)=>{
    res.writeHead(404,{
        'Content-Type':'text/html'
    });
    res.end(`<h2>${console.log(req)}</h2>`)

});
server.listen(3000);