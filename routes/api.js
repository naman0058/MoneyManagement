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
        pool.query(`select * from ${table1} where number = '${req.body.number}' and password = '${rq.body.password}'`,(err,result)=>{
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
        pool.query(`select * from ${table1} where number = '${req.body.number}' and password = '${rq.body.password}'`,(err,result)=>{
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
        pool.query(`select * from ${table1} where number = '${req.body.number}' and password = '${rq.body.password}'`,(err,result)=>{
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




// Admin Part


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



router.post('/show-all-agent',(req,res)=>{
    pool.query(`select * from ${table2} order by id desc`,(err,result)=>{
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





router.post('/show-all-customer',(req,res)=>{
    pool.query(`select * from ${table3} order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})






// admin part completed



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



router.get('/get-admin-index',(req,res)=>{
    var query = `select sum(price) as totalamount from earning where date = CURDATE();`
    var query1 = `select * from ${table1} order by id desc;`
    pool.query(query+query1,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})



router.get('/single-master',(req,res)=>{
    var query = `select sum(price) as totalamount from earning where date = CURDATE() and id = '${req.body.masterid}';`
    var query1 = `select * from ${table1} where id = '${req.body.masterid}';`
    pool.query(query+query1,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})






module.exports = router;
