const router = require('express').Router();
const authController = require('../controllers/usercontroller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
