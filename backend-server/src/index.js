
const express = require("express")
const fs = require("fs")
const  ImageEncryption  = require("./controllers/ImageEncryption.js")
const Decryption = require("./controllers/Decryption.js")
const path = require("path")
const upload = require("./multer.middleware.js")




const app = express();
const PORT = 8000;




app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT)
})

app.get("/" , (req, res) => {
    res.send("Server is running")
})


app.post('/api/upload', upload.single('file'), async function (req, res, next) {
    await ImageEncryption(req.file.filename, req.body.mes)
    const filepath = path.join(__dirname, '../Input', req.file.filename);
    fs.unlinkSync(filepath)
    res.send("Successfully Encrypted")
})

app.get("/api/getImage" ,  (req, res) => {
    const filepath = path.join(__dirname, '../Output', "Encrypted.png");
    res.sendFile(filepath)
      
})

app.post("/api/decode" ,upload.single('file'), async (req, res) => {
    console.log("requested")
    Decryption(req.file.filename).then((message) => {
        console.log(message)
        res.json({hidden: message})
    }).catch((err) => {
        console.log(err)
        res.send("Error")
    })
    
})









 

    

    



    


    
    











/*
fs.readFile('./Image.jpg' , (err, data) => {
    if(err){
        console.log(err)
    }else{
        const buffer = Buffer.from(data , 'binary')
        var base64Image = buffer.toString('base64');
        const message = "hello"
        base64Image = base64Image + message
        const result = Buffer.from(base64Image, "base64");
        
        fs.writeFileSync("messageA.txt", base64Image);
        fs.writeFileSync("new-path.png", result);
    }
})
*/

// Attempt to encode message was successfull


/*

fs.readFile('./new-path.png' , (err, data) => {
    if(err){
        console.log(err)
    }else{
        const buffer = Buffer.from(data , 'binary')
        var base64Image = buffer.toString('base64');
        fs.writeFileSync("message.txt", base64Image);
    }
})*/


// After decoding i get that i corrupted image file, and binary data of image also contains instructions about reading it , but i should refrain from playing with instructions




