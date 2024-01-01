const router=require('express').Router();
const httpContext=  require('express-http-context');
router.use(httpContext.middleware)
module.exports=router