const { resolveInclude } = require('ejs');
var express = require('express');
var router = express.Router();
var pool = require('./pool')


var table = 'admin'
var table1 = 'master'
var table2 = 'agent'
var table3 = 'customer'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/login',(req,res)=>{
    let body = req.body;
    if(req.body.type == 'admin'){
        pool.query(`select * from ${table} where number = '${req.body.number}'`,(err,result)=>{
            if(err) throw err;
            else if(result[0]){
                res.json({
                    msg : 'success'
                })
            }
            else {
                res.json({
                    msg : 'fail'
                })
            }
        })

    }
    else if(req.body.type=='master'){
        pool.query(`select * from ${table1} where number = '${req.body.number}'`,(err,result)=>{
            if(err) throw err;
            else if(result[0]){
                res.json({
                    msg : 'success'
                })
            }
            else {
                res.json({
                    msg : 'fail'
                })
            }
        })
    }
    else {
        pool.query(`select * from ${table2} where number = '${req.body.number}'`,(err,result)=>{
            if(err) throw err;
            else if(result[0]){
                res.json({
                    msg : 'success'
                })
            }
            else {
                res.json({
                    msg : 'fail'
                })
            }
        })
    }
})






router.post('/master-lock',(req,res)=>{
    pool.query(`update ${table1} set status = 'locked' where number = '${req.body.number}'`,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})




router.post('/add-master',(req,res)=>{
    let body = req.body
    pool.query(`insert into ${table1} set ?`,body,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})



router.get('/all-master',(req,res)=>{
    pool.query(`select * from ${table1} order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})



router.post('/add-agent',(req,res)=>{
    let body = req.body
    pool.query(`insert into ${table2} set ?`,body,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})




router.post('/show-agent',(req,res)=>{
    pool.query(`select * from ${table2} where masterid = '${req.body.masterid}' order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})


router.post('/add-customer',(req,res)=>{
    let body = req.body
    pool.query(`insert into ${table3} set ?`,body,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})




router.post('/show-customer-by-master',(req,res)=>{
    pool.query(`select * from ${table3} where masterid = '${req.body.masterid}' order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})




router.post('/show-customer-by-agent',(req,res)=>{
    pool.query(`select * from ${table3} where agentid = '${req.body.agentid}' order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})



module.exports = router;
