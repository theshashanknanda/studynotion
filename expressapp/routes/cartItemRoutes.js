const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { addCartItem, getCartItems, removeFromCart } = require('../controllers/cartItemController')
const {auth, isAdmin, isStudent, isInstructor} = require('../middlewares/auth')

router.post('/addCartItem', auth, addCartItem)
router.get('/getCartItems', auth, getCartItems)
router.post('/removeCartItem', auth, removeFromCart)

module.exports = router
