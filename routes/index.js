var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




router.post('/change-password',(req,res)=>{
  pool.query(`update ${req.body.type} set password = '${req.body.password}' where id = '${req.body.id}'`,(err,result)=>{
    if(err) throw err;
    else res.json({
      msg : success
    })
  })
})



module.exports = router;
