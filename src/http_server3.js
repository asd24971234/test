import http from 'http';
import fs from 'fs';
const server =http.createServer((req,res)=>{
    fs.writeFile(__dirname+'/header01.json',
    JSON.stringify(req.headers),
    function(error){
        if(error){
            console.log(error);
        }else{
            res.end('ok');
        }
    })

});
server.listen(3000)
