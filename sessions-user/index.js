const app = require('./app')
const dbConnected = require('./config/db')

require('dotenv').config()
const port = process.env.PORT ||5000

// CLIENT ERROR

app.use((req,res,next)=>{
    try {
        res.status(404).send("route is not found")
    } catch (error) {
       next(error) 
    }
})

// SERVER ERROR

app.use((err,req,res,next)=>{
    try {
        res.status(404).send("somthing is broke")
    } catch (error) {
       console.log(error.message)
    }
})


app.listen(port,async()=>{
    console.log(`server is running at http://localhost:${port}`)
    await dbConnected()
})