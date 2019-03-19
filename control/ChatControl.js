const socket_io = require('socket.io');
const io = socket_io()
const socketApi = {
    io : io
}
socketApi.createServer = ()=>{
 
    io.on('connection', (socket) => {
        
        
        socket.on('leaveRoom', (name) => {
            console.log(name +"방을 나감")
            socket.leave(name)
        })

        socket.on('joinRoom', (name)=> {
            console.log(name +"방 들어옴")
            socket.join(name)
        })

        socket.on('chat message', (msg) => {
            io.to(msg.roomname).emit('chat message', msg);
        });
    })
    
}

module.exports = socketApi;






