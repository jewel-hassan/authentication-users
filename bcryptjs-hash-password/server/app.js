const express = require("express");
const useRouter = require("./routes/usersRoute");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/", useRouter);

module.exports = app;
