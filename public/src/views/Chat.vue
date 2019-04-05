<template>
    <v-container>
        <v-layout>
             <v-flex xs12 sm6 offset-sm3>
                <div id="messages">
                    <div v-for="(msg, index) in messages" :key="index">
                        <div v-if="msg.user != null"><v-card><v-card-title>{{ msg.user }} : {{ msg.message }}</v-card-title></v-card></div>
                        <div class="font-weight-bold" v-if="msg.alertmessage != null"><v-card><v-card-title class>{{ msg.alertmessage }}</v-card-title></v-card></div>
                    </div>
                  
                </div>
             </v-flex>   
            <v-flex>
                <v-textarea
                outline
                label="메시지"
                v-model="message"
                >
                </v-textarea>
                <v-btn @click="sendMessage">전송</v-btn>
                <v-btn @click="leave">나가기</v-btn>
            </v-flex>
        </v-layout>
    </v-container>



           
</template>
<script>
import io from 'socket.io-client'
//http://192.168.1.8

export default {
    data () {
        return {
            user: sessionStorage.getItem('Nickname'),
            message : '',
            messages : [],
            socket : io('https://192.168.1.5:3000',{transports : ['websocket']}),
            height : '',
            offsetTop : 400
        }
    },
    methods : {
        sendMessage () {
       
            this.socket.emit('chat message', { 
                        user : this.user,
                        message : this.message,
                        roomname : this.$route.query.title
                        })
            this.message = ''
        },
        leave () {
            this.socket.emit('leaveRoom',{
                name : this.$route.query.title,
                nickname : sessionStorage.getItem('Nickname')
            })
            this.$router.replace({path : '/'})
        },
        onScroll (e) {
        this.offsetTop = e.target.scrollTop
      }
    },
    created() {
    
    },
    mounted () {
        this.socket.on('chat message', (msg) => {
            this.messages = [...this.messages, msg];
             let objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
        })
        this.socket.emit('joinRoom', {
            name : this.$route.query.title,
            nickname : sessionStorage.getItem('Nickname')
            }) 

    }
}

</script>


<style>
    #messages {
        height : 300px;
        overflow-x: hidden;
        overflow-y:auto;
    }
  
</style>