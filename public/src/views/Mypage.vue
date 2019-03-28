<template> 
    <v-container fill-height style="max-width:450px;">
        <v-layout align-center row wrap>
            <v-flex>
                <v-card>
                    <v-toolbar flat>
                    <v-toolbar-title >
                        <v-btn flat @click="showRevise"><b>정보수정</b></v-btn>
                        <v-btn flat @click="showChange"><b>비밀번호 변경</b></v-btn>
                        <v-btn flat @click="showDelete"><b>회원 탈퇴</b></v-btn>
                    </v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3" v-if="reviseshow">
                    <v-text-field
                    label="닉네임"
                    v-model="nickname"
                    type="nickname"
                    >
                    </v-text-field>
                    <v-select
                    :items="Sexitems"
                    v-model="Sex"
                    label="성별"
                    ></v-select>
                    <v-select
                    :items="Areaitems"
                    label="지역"
                    v-model="Area"
                    ></v-select>
                    <v-select
                    :items="Ageitems"
                    label="나이"
                    v-model="Age"
                    ></v-select>
                    <v-btn 
                    color="primary"
                    large
                    block
                    depressed
                    @click="revise"
                    >수정하기
                    </v-btn>
                    </div>
                    <div class="pa-3" v-if="changeshow">
                        <v-alert
                            :value="error"
                            type="error"
                            class="mb-3"
                            >
                            입력하신 비밀번호가 다릅니다.
                        </v-alert> 
                        <v-text-field
                        label="새로운 비밀번호"
                        v-model="password"
                        type="password"
                        >
                        </v-text-field>
                        <v-text-field
                        label="비밀번호 재입력"
                        v-model="password2"
                        type="password"
                        >
                        </v-text-field>
                         <v-btn 
                         color="primary"
                         large
                         block
                         depressed
                         @click="revisePassword"
                         >비밀번호 변경
                        </v-btn>
                    </div>
                    <div class="pa-3" v-if="deleteshow">
                        
                        <v-alert
                            :value="delerror"
                            type="error"
                            class="mb-3"
                            >
                            비밀번호가 일치하지 않습니다.
                        </v-alert>  
                        <v-text-field
                        label="현재 비밀번호"
                        v-model="delpassword"
                        type="password"
                        >
                        </v-text-field>
                        <v-text-field
                        label="비밀번호 재입력"
                        v-model="delpassword2"
                        type="password"
                        >
                        </v-text-field>
                         <v-btn 
                         color="primary"
                         large
                         block
                         depressed
                         @click="deleteInfo"
                         >회원 탈퇴
                        </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import {mapState} from 'vuex'
import {UserInfo} from '../api'
import {Token} from '../api';
import axios from 'axios'
export default {
    data() {
        return {
            Sexitems : ['남자', '여자'],
            Ageitems : ['10대','20대','30대','40대','50대','60대'],
            Areaitems : ['경기도','강원도','충청남도','충청북도','경상북도','경상남도','전라북도','전라남도','제주도'],
            email : sessionStorage.getItem('email'),
            nickname : sessionStorage.getItem('Nickname'),
            Sex : sessionStorage.getItem('Sex'),
            Area : sessionStorage.getItem('Area'),
            Age : sessionStorage.getItem('Age'),
            password : '',
            password2 : '',
            delpassword : '',
            delpassword2 : '',
            reviseshow : true,
            changeshow : false,
            error : false,
            delerror : false,
            deleteshow : false
        }
    },
    methods: {
        revise() {
            
            UserInfo.fetch(this.email,this.nickname,this.Sex,this.Area,this.Age)
                    .then((res) => {
                        if(res.status === 200){
                        this.$router.replace({path : '/'})
                        sessionStorage.setItem('email',this.email)
                        sessionStorage.setItem('Nickname',this.nickname)
                        sessionStorage.setItem('Sex',this.Sex)
                        sessionStorage.setItem('Area',this.Area)
                        sessionStorage.setItem('Age',this.Age)
                        }
                    })
                    .catch(()=> {
                        Token.getNewToken()
                       .then(res => {
                          if(res.status === 200){
                            const newToken = res.data.token
                            sessionStorage.removeItem('access-token')
                            sessionStorage.setItem('access-token',newToken);
                            const accessToken = sessionStorage.getItem('access-token');
                            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                            this.$router.replace({name : 'home'})
                          }
                       })
                    })
                    
                        
                     
               
           
        },
        revisePassword() {
            UserInfo.revise(this.email,this.password2)
                    .then((res)=> {
                        if(res.status === 200){
                            this.$router.replace({path : '/'})
                        }
                    })
                    .catch(() => {
                        Token.getNewToken()
                       .then(res => {
                          if(res.status === 200){
                            const newToken = res.data.token
                            sessionStorage.removeItem('access-token')
                            sessionStorage.setItem('access-token',newToken);
                            const accessToken = sessionStorage.getItem('access-token');
                            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                            this.$router.replace({name : 'home'})
                          }
                       })
                    })
            
        },
        deleteInfo() {
            UserInfo.delete(this.email,this.delpassword2)
                    .then((res) =>{
                        if(res.status === 200){
                        this.$router.replace({path:'/'})
                        this.$store.dispatch('logout')
                        }
                    })
                    .catch(() => {
                        
                        this.delerror = true
                    })
        
        },
        showRevise () {
            this.deleteshow = false
            this.changeshow = false
            this.reviseshow = true
        },
        showChange () {
            this.deleteshow = false
            this.changeshow = true
            this.reviseshow = false
        },
        showDelete () {
            this.deleteshow = true
            this.changeshow = false
            this.reviseshow = false
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    watch : {
        password2 : function(){
            if(this.password !== this.password2){
                this.error = true
            }else{
                this.error = false
            }
        }
   
    }
}
</script>