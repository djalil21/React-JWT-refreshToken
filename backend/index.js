const express = require('express')
const app = express()
const cors = require('cors')
const authRoutes = require('./routes/auth.route')
const postsRoutes = require('./routes/posts.route')

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/posts', postsRoutes)


app.listen(1000, () => {
    console.log('hosted on 1000')
})