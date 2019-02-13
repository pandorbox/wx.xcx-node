const express=require("express");
const pool=require("./pool");
const cors=require("cors");

var app=express();
var server = app.listen(3000);
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({
extended:false
}));
app.use(cors({
  origin:"http://127.0.0.1:8081",
  credentials:true 
}))
app.use(express.static(__dirname+"/public"));

const demo=require('./user/myly.js');
app.use('/demo',demo);

app.get("/bannerimg",(req,res)=>{
    var sql="select * from dq_shopclassimg where other='banner'";
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.send(result);
    })
    
})
app.get("/shophotimg",(req,res)=>{
    var sql="select * from dq_shopclassimg where other='hot'";
    pool.query(sql,(err,result)=>{
        if(err)throw err;
        res.send(result);
    })
    
})
app.get("/shopclass",(req,res)=>{
    var name=req.query.name;
    var sql="SELECT * FROM dq_shopclass WHERE name=?";
    pool.query(sql,[name],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
   
})
app.get("/shopclassimg",(req,res)=>{
    var $classn=req.query.classn;
	var $name=req.query.name;
    var sql="SELECT *  FROM dq_shopclassimg WHERE classn=?&&name=?";
    pool.query(sql,[$classn,$name],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
   
})
app.get("/shopclassimgs",(req,res)=>{
    var $name=req.query.name;
    var sql="SELECT *  FROM dq_shopclass WHERE name=?";
	pool.query(sql,[$name],(err,result)=>{
        if(err) throw err;
        if(!result.length>0){
            res.send("404");
            return;
        }
        var classn=result[0].classn;
    
		
		var sql="SELECT *  FROM dq_shopclassimg WHERE name=? and classn=?";
		pool.query(sql,[$name,classn],(err,result)=>{
			if(err) throw err;
			res.send(result);
		});
    });
})
app.get("/shopmsg",(req,res)=>{
    var imgid=req.query.imgid;
    var sql="SELECT *  FROM dq_shopclassimg WHERE imgid=?";
    pool.query(sql,[imgid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
app.get("/navlist",(req,res)=>{
    var sql="SELECT *  FROM dq_navimg";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
app.get("/search",(req,res)=>{
    var $msg=req.query.msg;
    var $msg='%'+$msg+'%';
    var sql="SELECT * FROM dq_shopclassimg WHERE title LIKE ? OR size LIKE ?";
    pool.query(sql,[$msg,$msg],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send(result);
            return;
        }else{
            res.send("1");
            return;
        }
    })
})
