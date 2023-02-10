const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,"public")));
app.set('views',path.join(__dirname,"public"));

app.engine('html',require('ejs').renderFile);
app.set("views engine", 'html');

app.get('/',(req,res)=>{
    res.render('views/index.html')
});


let mensagens = [];

io.on('connection', socket=>{
    
    console.log("socket conectado:",socket.id)
    socket.emit('previousMensagem', mensagens)

    socket.on('sendMessage',data =>{
       
        mensagens.push(data);
        socket.broadcast.emit('receivedMensage', data)
    });
})
let port = 3000;
server.listen(port,()=>{
    console.log('aberto no site: localhost: ',port)
});
