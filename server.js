const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 8000
const app = express();

const book = require("./MVC/router/bookRouter")
const connect = require("./MVC/database/connect")
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.status(200).json("Response Success")
    console.log("Response Success")
})

app.use("/book", book)
app.listen(PORT, () =>{
    console.log(`Server Running in http://localhost:${PORT}`)
})