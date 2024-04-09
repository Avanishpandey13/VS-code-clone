var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path")
const Globalpath = path.join(__dirname,"../","public","uploads")

/* GET home page. */
router.get('/', function(req, res, next) {
  const files = fs.readdirSync(Globalpath)
  res.render('index',{
    files: files,
    filedata:"",
    filename:""
  });
});

router.get("/file/:filename",(req,res) =>{
  const files = fs.readdirSync(Globalpath)
  const filedata = fs.readFileSync(path.join(Globalpath,req.params.filename),"utf-8")
  res.render("index",{
    files: files,
    filedata: filedata,
    filename: req.params.filename
  })
})

router.post("/createfile",(req,res) =>{
  const {filename} = req.body
  fs.writeFileSync(path.join(Globalpath,filename),"")
  res.redirect("/")

})

router.get("/delete/:filename",(req,res,next)=>{
  fs.unlinkSync(path.join(Globalpath,req.params.filename))
  res.redirect("/")

})

router.post("/update/:filename",(req,res,next)=>{
  const data = req.body.textdata
  fs.writeFileSync(path.join(Globalpath,req.params.filename),`${data}`)
  res.redirect(`/file/${req.params.filename}`)
})


module.exports = router;
