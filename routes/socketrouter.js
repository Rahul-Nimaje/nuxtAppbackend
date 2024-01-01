const router=require('express').Router();


router.post('/connect',async(req,res)=>{
    console.log('request for connection',req.body);
    res.send('working api')
})
module.exports=router