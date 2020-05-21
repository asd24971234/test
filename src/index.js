var express = require('express');
var multer = require('multer');
var upload = multer({dest:'tmp_uploads/'})
var fs = require('fs');

var app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('main',{name:'vireee',pagetitle:'我的網站'});
});
app.get('/sales-json',(req,res)=>{
    const sales =require(__dirname+'/../data/sales');
    // 
    res.render('sales-json',{ sales });
});
app.get('/try-query',(req,res)=>{
    res.json(req.query);
});

app.get('/try-post-form',(req,res)=>{
    res.render('try-post-form',{pagetitle:'測試表單'});
})
app.get('/try-upload',(req,res)=>{
    res.render('try-upload');
})
app.post('/try-upload',upload.single('avater'),(req,res)=>{
    const output={
        succes:'false',
        uploadImg :"",
        nickname:"",
        error:''
    }
    output.nickname=req.body.nickname || '';
    if(req.file&& req.file.originalname){
        switch(req.file.mimetype){
            case 'image/jpeg':
            case 'image/png':
                fs.rename(req.file.path,'./public/img/'+req.file.originalname,error=>{
                    if(!error){
                        output.succes = 'true';
                        output.uploadImg ="/img/"+req.file.originalname;
                    }
                    res.render('try-upload',output)
                });
                break;
            default:
                fs.unlink(req.file.path,error=>{
                    res.render('try-upload',{output})
                })
        }
        
    }
});
app.post('/try-post-form',(req,res)=>{
    res.locals.pagetitle = '測試表單-posted';
    res.render('try-post-form',req.body);
});
app.post('/try-json-form',(req,res)=>{
    req.body.contenType = req.get('Content-Type')
    res.json(req.body)
});
app.get('/pending',(req,res)=>{

});
app.use(express.static('public'));
app.use((req,res)=>{
    res.status(404);
    res.send(`<h2>找不到你要的頁面</h2> <img src="https://cdn.pixabay.com/photo/2020/04/17/14/16/mountains-5055387_1280.jpg">`);
})
app.listen(3000,()=>{
    console.log('開始監聽');
});