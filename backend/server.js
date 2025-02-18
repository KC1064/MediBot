const express = require("express");
const bodyParser= require("body-parser");



const app= express();

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>');
});


app.listen(3000,function()
{
    
    console.log("Server is up and running on port 3000");
    
})