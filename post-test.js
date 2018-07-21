var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var qs = require('querystring');

var app = express();

app.use('/v4', bodyParser());
app.use('/v4', (req,res, next)=>{
    
    // 判断是否是post方法
    if( req.header.methods == 'post'){
   
    

    // 创建请求
    var request = https.request({

    }, (response)=>{
        let value = '';
        response.on('data', (bf)=>{
            value += bf;
        })

        response.on('end', ()=>{
            res.json(JSON.parse(value));
        })

    });

    //写post内容
    request.write(qs.stringify(req.body));

    //发送请求
    request.end();

}else{
    next();
}

})

app.use('/v4', httpproxymiddleware({

}));

