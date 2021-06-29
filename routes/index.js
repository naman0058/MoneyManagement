var express = require('express');
var router = express.Router();
var pool = require('./pool')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/change-password',(req,res)=>{
  console.log('body hai',req.body)
  pool.query(`update ${req.body.type} set password = '${req.body.password}' where id = '${req.body.id}'`,(err,result)=>{
    if(err) {
      res.json({
        msg : err
      })
    }
    else res.json({
      msg : 'success'
    })
  })
})



module.exports = router;
