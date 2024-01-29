import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import router from './routes/index.mjs'
const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(router) 


const PORT = process.env.PORT || 3001

app.get('/', (request, response) => {
    response.cookie('hello','word',{maxAge:6000 * 60 * 2})
    response.status(200).send({ msg: 'Hello word' })
})


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})



