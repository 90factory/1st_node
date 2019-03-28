const socket_io = require('socket.io');
const io = socket_io()
const socketApi = {
    io : io
}
socketApi.createServer = ()=>{
 
    io.on('connection', (socket) => {
        
        
        socket.on('leaveRoom', (data) => {
            
            msg = {
              
                alertmessage : `${data.nickname} 님이 대화방을 나갔습니다.`
            }
            io.to(data.name).emit('chat message', msg)
            socket.leave(data.name)
        })

        socket.on('joinRoom', (data)=> {
         
            socket.join(data.name)
            msg = {
         
                alertmessage : `${data.nickname} 님이 대화방에 참석 하였습니다.`
            }
            io.to(data.name).emit('chat message', msg)
        })

        socket.on('chat message', (msg) => {
            io.to(msg.roomname).emit('chat message', msg);
        });
    })
    
}

module.exports = socketApi;






