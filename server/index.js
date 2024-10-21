require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const meetingRouter = require('./routes/meetingRoutes')
const connectDB = require('./db/conn')
const app = express()
const port = process.env.PORT || 3000

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/users', userRouter);
app.use('/api/meetings',meetingRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})