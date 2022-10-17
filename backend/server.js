const express  = require ('express')
const dotenv  = require ('dotenv').config()
const port = process.env.PORT || 5000
const{ errorHandler } = require('../backend/middleware/errorMiddleware');
const colors = require("colors")
const connectDB  = require('../backend/config/db');

connectDB();


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('../routes/goalRoutes'))
app.use('/api/users', require('../routes/userRoutes'))
app.use('/api/habits', require('../routes/habitsRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))


