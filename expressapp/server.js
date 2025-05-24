// initialize express app
const cookieParser = require('cookie-parser')
let express = require('express')
let app = express()
const fileupload = require('express-fileupload')

// initialize dotenv
require('dotenv').config()

// setup cors
const cors = require('cors')
app.use(cors())

// setup middlewares
app.use(express.json())
app.use(cookieParser())
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))

// start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})

// connecting database
const {connect} = require('./config/database')
connect()

// setup cloudinary
const {cloudinaryConfig} = require('./config/cloudinary')

// index route
app.get('/', (req, res) => {
    return res
    .status(200)
    .json({
        success: true,
        message: 'index route',
    })

})

// setting up routes
const BASE_ROUTE_V1 = '/api/v1/'

const authRoutes = require('./routes/authRoutes')
app.use(BASE_ROUTE_V1, authRoutes)

const resetPasswordRoutes = require('./routes/resetPasswordRoutes')
app.use(BASE_ROUTE_V1, resetPasswordRoutes)

const profileRoutes = require('./routes/profileRoutes')
app.use(BASE_ROUTE_V1, profileRoutes)

const categoryRoutes = require('./routes/categoryRoutes')
app.use(BASE_ROUTE_V1, categoryRoutes)

const courseRoutes = require('./routes/courseRoutes')
app.use(BASE_ROUTE_V1, courseRoutes)

const sectionRoutes = require('./routes/sectionRoutes')
app.use(BASE_ROUTE_V1, sectionRoutes)

const subsectionRoutes = require('./routes/subsectionRoutes')
app.use(BASE_ROUTE_V1, subsectionRoutes)

const ratingandreviewRoutes = require('./routes/ratingandreviewRoutes')
app.use(BASE_ROUTE_V1, ratingandreviewRoutes)

const cartItemRoutes = require('./routes/cartItemRoutes')
app.use(BASE_ROUTE_V1, cartItemRoutes)

// 404 not found
app.use((req, res, next) => {
    return res
    .status(404)
    .json({
        success: false,
        message: 'Route not found',
    })
})

// error handler
app.use((err, req, res, next) => {
    console.log(`Error at: ${err.message}`)
})
