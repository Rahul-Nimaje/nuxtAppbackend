var express = require('express');
var router = express.Router();
const fn = require('./functions/userModule');
var httpContext = require('express-http-context');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', async (req, res) => {
  try {
    const response = await fn.users(req.body)
    res.send(response)
  } catch (err) {
    throw new Error(err)
  }

})
router.post('/login', async (req, res) => {
  const loginResponse = await fn.verifyUser(req.body).catch(err=>
    {
    });
  res.send(loginResponse)
})
router.use(require('../middleware/auth'))
router.post('/updateProfile', async (req, res) => {
  const changePassword = await fn.passWordChange(req.body);
  res.send(changePassword)
})
module.exports = router;
