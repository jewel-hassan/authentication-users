const dbConnected = require("./config/db");
const app = require("./app");
const { port } = require("./secret/userSecret");


// HOME ROUTE
app.get("/",(req,res)=>{
    try {
        res.status(200).sendFile(__dirname+"/./views/index.html")
    } catch (error) {
        res.status(404).json({
            success:false,
            message:error.message
        })
        
    }
})

// CLIENT ERROR
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "rout is not found",
  });
  next();
});

// SERVER ERROR
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "something is broke",
  });
});



// SERVER RUNNING PORT
app.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await dbConnected();
});
