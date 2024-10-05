const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerUser, loginUser , profile , jokes } = authController;
const { protect } = require('../middlewares/authMiddleware');



router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, profile);
router.get('/random-joke',protect, jokes);



module.exports = router