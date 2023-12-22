var express = require('express');
var router = express.Router();
const fn = require('./functions')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', async (req, res) => {
  console.log("rqqqqqqqqqq", req.body);
  try {
    const response = await fn.users(req.body)
    res.send(response)
  } catch (err) {
    console.log("errrrrrrrrrrrrrr", err)
    throw new Error(err)
  }

})
router.post('/login', async (req, res) => {
  console.log("request Login", req.body);
  const loginResponse = await fn.verifyUser(req.body).catch(err=>
    {
      console.log("catch erro",err)
    });
  console.log("loginResponse", loginResponse)
  res.send(loginResponse)
})
router.use(require('../middleware/auth'))
router.post('/updateProfile', async (req, res) => {
  console.log("regisssssssteruser", req.body)
  const changePassword = await fn.passWordChange(req.body);
  res.send(changePassword)
})
module.exports = router;
