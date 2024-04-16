require('dotenv').config()
const app = require("./app")
const dbConnected = require('./config/db')
const port = process.env.PORT || 3000







app.listen(port,async()=>{
    console.log(`server is running at http://localhost:${port}`)
    await dbConnected()
})