const pool=require('../pool.js');
const express=require('express');
var router=express.Router();

//fs fileSystem 文件系统模块
//操作文件:创建/删除/移动文件
const fs = require("fs");
const multer = require("multer");
//创建multer对象指定上传文件目录
//指定上传文件目录
var upload = multer({dest:"public/img/"});
//登录验证
router.post('/login',(req,res)=>{
	//获取用户名称
	var $uname=req.body.uname;
	if (!$uname)
	{
		res.send({code:401,msg:'用户名不能为空'});
		return;
	}
	var $upwd=req.body.upwd;
	if (!$upwd)
	{
		res.send({code:402,msg:'密码错误'});
		return;
	}
	var sql="select * from dq_user where "
	+"uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
	if (err) throw err;
	if (result.length>0)
	{
		res.send("1");
	}
	else{
		res.send('0');
	}
	});
});


//删除导航栏分类数据
router.post('/delete',(req,res)=>{
	var $name=req.body.uname;
	var $classn=req.body.upwd;
	if (!$name)
	{
		res.send('名称不能为空');
		return;
	}
	if (!$classn)
	{
		res.send('品牌错误');
		return;
	} 
	
			//执行删除
    var sql="delete from dq_shopclass where name=? and classn=?";
		pool.query(sql,[$name,$classn],(err,result)=>{
			if (err) throw err;
			if(result.affectedRows>0){
				res.send('删除成功')
			}
			else{
				res.send('删除失败')
			}
		});	
});
//添加导航栏分类数据
router.post('/putin',(req,res)=>{
	var $name=req.body.uname;
	var $classn=req.body.upwd;
	if (!$name)
	{
		res.send('名称不能为空');
		return;
	}
	if (!$classn)
	{
		res.send('品牌错误');
		return;
	} 
	//首先判断该产品下的添加品牌是否已经存在
	var sql="select * from dq_shopclass where  name=? and classn=?";
	pool.query(sql,[$name,$classn],(err,result)=>{
		if (err) throw err;
		if (result.length>0)
		{
			res.send($classn+'品牌已存在');
			return;
		}	
		else{
			var sql="INSERT INTO dq_shopclass VALUES (?,?)";
			pool.query(sql,[$name,$classn],(err,result)=>{
						if (err) throw err;
						if(result.affectedRows>0){
							res.send('添加成功');
						}
						else{
							res.send('添加失败');
						}
			});
		}
	});
});

//根据值修改信息
router.post('/change',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	console.log($uname,$upwd);
	var sql='select * from dq_shopclassimg where size=?';
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		console.log(result);
	});
	var sql='update dq_shopclassimg set price=? WHERE size=?';
	pool.query(sql,[$upwd,$uname],(err,result)=>{
		if(err)throw err;
		if (result.affectedRows>0){
			res.send("修改成功");
			return;
		}
		else{
			res.send({code:404,msg:'修改失败'});
			return;
		}
	
	});
});


//修改轮播图片 创建处理上传请求 /upload 上传单个文件
//upload.single() 一次上传一张图片 指定上传文件表单 name="mypic"
router.post("/banner",upload.single("mypic"),(req,res)=>{
		//选择跟换位置
		var num=req.body.bannernum
		//console.log(num);
		//console.log(req.file);
	//5:获取上传文件大小  拒绝超过2MB文件 (字节)
	var size = req.file.size/1000/1000;
	if(size > 2){
	res.send({code:-1,msg:"上传图片过大 超过2MB"});
	return;
	}
	//6:获取上传文件类型  图片
	//image/gif image/png image/jpg  text/css 
	var type = req.file.mimetype;
	var i2 = type.indexOf("image");
	if(i2==-1){
	res.send({code:-2,msg:"上传只能是图片"});
	return;
	}
	//7:创建新文件名 1.jpg  191283874393.jpg
	var src = req.file.originalname;
	var i3 = src.lastIndexOf(".");
	var suff = src.substring(i3,src.length);
	console.log(suff)
	var des = "./public/img/banner/"+"banner"+num+suff;
	//8:将临时文件移动upload目录下
	fs.renameSync(req.file.path,des);
	//9:返回上传成功信息
	//10:将上传图片新名称 ./upload/aaaaa.jpg
	//保存数据库
	res.send("图片更换成功");
});

//修改热销图片
router.post('/removeshophot',(req,res)=>{
	var $name=req.body.name;
	var $size=req.body.size;
	var sql='select * from dq_shopclassimg where name=? and size=?';
	pool.query(sql,[$name,$size],(err,result)=>{
		if(err) throw err;
		if (result.affectedRows=0){
			res.send("不存在该商品");
			return;
		}else{
			var sql="update dq_shopclassimg set other='' WHERE name=? and size=?";
			pool.query(sql,[$name,$size],(err,result)=>{
			if(err)throw err;
			if (result.affectedRows>0){
			res.send("修改成功");
				return;
			}
			else{
				res.send({code:404,msg:'修改失败'});
				return;
			}
	
			});
		}
	});
	
});
router.post('/addshophot',(req,res)=>{
	var $name=req.body.name;
	var $size=req.body.size;
	var sql='select * from dq_shopclassimg where name=? and size=?';
	pool.query(sql,[$name,$size],(err,result)=>{
		if(err) throw err;
		if (result.affectedRows=0){
			res.send("不存在该商品");
			return;
		}else{
			var sql="update dq_shopclassimg set other='hot' WHERE name=? and size=?";
			pool.query(sql,[$name,$size],(err,result)=>{
			if(err)throw err;
			if (result.affectedRows>0){
			res.send("修改成功");
				return;
			}
			else{
				res.send({code:404,msg:'修改失败'});
				return;
			}
	
			});
		}
	});
	
});

//上传商品信息 
router.post("/addshop",upload.array("myimg",8),(req,res)=>{
	//console.log(req.files);
 //获取上传文件大小  拒绝超过2MB文件 (字节)
 var imgurl=[];
 for(var i=0;i<7;i++){
 var size = req.files[i].size/1000/1000;
 if(size > 2){
  res.send({code:-1,msg:"上传图片过大 超过2MB"});
  return;
 }
 //获取上传文件类型  图片
 //image/gif image/png image/jpg  text/css 
 var type = req.files[i].mimetype;
 var i2 = type.indexOf("image");
 if(i2==-1){
   res.send({code:-2,msg:"上传只能是图片"});
   return;
 }
 //创建新文件名
 var src = req.files[i].originalname;
 console.log(req.files[i])
 var i3 = src.lastIndexOf(".");
 var fRand = Math.floor(Math.random()*9999);
 var suff = src.substring(i3,src.length);
 var des = "public/img/shop/"+fRand+suff;
 //将临时文件移动upload目录下
 fs.renameSync(req.files[i].path,des);
 //得到上传图片路径
 var url="http://127.0.0.1:3000/img/shop/"+fRand+suff
  imgurl=imgurl.concat(url);
}
var img_url=imgurl[0];
var img_urlm1=imgurl[1];
var img_urlm2=imgurl[2];
var img_urlm3=imgurl[3];
var img_urls1=imgurl[4];
var img_urls2=imgurl[5];
var img_urls3=imgurl[6];
var name=req.body.name;
var classn=req.body.classn;
var size=req.body.size;
var title=req.body.title;
var price=req.body.price;
var sql="INSERT INTO dq_shopclassimg VALUES(?,?,NULL,?,?,?,?,?,?,?,?,?,?,'')";
pool.query(sql,[name,classn,img_url,img_urlm1,img_urlm2,img_urlm3,img_urls1,img_urls2,img_urls3,size,title,price],(err,result)=>{
	if(err)throw err;
});

 //9:返回上传成功信息
 //10:将上传图片新名称 ./upload/aaaaa.jpg
 //保存数据库
 res.send("添加成功");
});





//导出
module.exports=router; 