const { resolveInclude } = require('ejs');
var express = require('express');
var router = express.Router();
var pool = require('./pool')


var table = 'admin'
var table1 = 'master'
var table2 = 'agent'
var table3 = 'customer'


var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = yyyy+'-'+mm+'-'+dd;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/login',(req,res)=>{
    let body = req.body;
    if(req.body.type == 'admin'){
        pool.query(`select * from ${table} where number = '${req.body.number}' and password = '${rq.body.password}'`,(err,result)=>{
            if(err) throw err;
            else if(result[0]){
                res.json({
                    msg : 'success',
                    result : result
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
                    msg : 'success',
                    result : result
                })
            }
            else {
                res.json({
                    msg : 'fail',
                    result : result
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
        else res.json(result)
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



router.get('/show-all-agent',(req,res)=>{
    pool.query(`select * from ${table2} order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})




router.post('/show-agent',(req,res)=>{
    pool.query(`select * from ${table2} where masterid = '${req.body.masterid}' order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
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
        else res.json(result)
    })
})




router.post('/show-customer-by-agent',(req,res)=>{
    pool.query(`select * from ${table3} where agentid = '${req.body.agentid}' order by id desc`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
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




router.post('/get-master-index',(req,res)=>{
    var query = `select sum(price) as totalamount from earning where date = CURDATE() and masterid = '${req.body.masterid}';`
    var query1 = `select * from ${table2} where masterid = '${req.body.masterid}' order by id desc;`
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




router.get('/single-agent',(req,res)=>{
    var query = `select sum(price) as totalamount from earning where date = CURDATE() and id = '${req.body.masterid}';`
    var query1 = `select * from ${table1} where id = '${req.body.masterid}';`
    pool.query(query+query1,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})





router.post('/agent-index',(req,res)=>{
    var query = `select sum(price) as totalamount from earning where date = CURDATE() and agentid = '${req.body.agentid}';`
    var query1 = `select * from ${table3} where agentid = '${req.body.agentid}' order by id desc;`
   pool.query(query+query1,(err,result)=>{
       if(err) throw err;
       else res.json(result)
   })
})




router.post('/save-earning',(req,res)=>{
    let body = req.body;
    body['date'] = today
    pool.query(`insert into earning set ?`,body,(err,result)=>{
        if(err) throw err;
        else res.json({
            msg : 'success'
        })
    })
})




router.post('/single-customer-data',(req,res)=>{
    pool.query(`select * from ${table3} where id = '${req.body.id}'`,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})


router.post('/single-master-data',(req,res)=>{
    var query = `select * from ${table1} where id = '${req.body.id}';`
    var query1 = `select sum (price) as totalamount from earning where masterid = '${req.body.id}';`
    pool.query(query+query1,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})


router.post('/single-agent-data',(req,res)=>{
    var query = `select * from ${table2} where id = '${req.body.id}';`
    var query1 = `select sum (price) as totalamount from earning where agentid = '${req.body.id}';`
    pool.query(query+query1,(err,result)=>{
        if(err) throw err;
        else res.json(result)
    })
})


// router.post('/master-report',(req,res)=>{
//     pool.query(`select * from earning `)
// })


module.exports = router;
