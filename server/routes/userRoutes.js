const express = require('express');
const { registerUser, loginUser, getUser, getAllUsers } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', protect,getAllUsers);
userRouter.get('/me', protect, getUser); 

module.exports = userRouter;
