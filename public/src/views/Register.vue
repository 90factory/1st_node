<template> 
    <v-container fill-height style="max-width:450px;">
        <v-layout align-center row wrap>
            <v-flex xs12>
                 <v-alert
                    :value="error"
                    type="error"
                    class="mb-3"
                    >
                    중복된 이메일 입니다.
                </v-alert> 
                 <v-alert
                    :value="nickerror"
                    type="error"
                    class="mb-3"
                    >
                    중복된 닉네임 입니다.
                </v-alert>
                  <v-alert
                    :value="emptyerror"
                    type="error"
                    class="mb-3"
                    >
                 <span v-for="(item,index) in emptylist" :key="index"> {{item}} </span>항목을 입력하세요
                </v-alert>  
                <v-card>
                    <v-toolbar flat>
                    <v-toolbar-title>회원가입</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                    <v-text-field
                    label="email"
                    v-model="email"
                    :rules="emailRules"
                    required
                    >
                    </v-text-field>
                    <v-text-field
                    label="password"
                    v-model="password"
                    type="password"
                     :rules="passwordRules"
                    required
                    >
                    </v-text-field>
                    <v-text-field
                    label="닉네임"
                    v-model="nickname"
                    type="name"
                    :rules="nickRules"
                    required
                    >
                    </v-text-field>
                    <v-select
                    :items="Sexitems"
                    v-model="Sexvalue"
                    label="성별"
                    :rules="[v => !!v || 'Item is required']"
                    required
                    ></v-select>
                    <v-select
                    :items="Areaitems"
                    label="지역"
                    v-model="Areavalue"
                    :rules="[v => !!v || 'Item is required']"
                    required
                    ></v-select>
                    <v-select
                    :items="Ageitems"
                    label="나이"
                    v-model="Agevalue"
                    :rules="[v => !!v || 'Item is required']"
                    required
                    ></v-select>
                    <v-btn 
                    color="primary"
                    large
                    block
                    depressed
                    @click="register"
                    >회원가입
                    </v-btn>
                    </div>
             
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {Register} from '../api'
export default {
    data () {
        return {
            email : '',
            password : '',
            nickname : '',
            Sexitems : ['남자', '여자'],
            Ageitems : ['10대','20대','30대','40대','50대','60대'],
            Areaitems : ['경기도','강원도','충청남도','충청북도','경상북도','경상남도','전라북도','전라남도','제주도'],
            Sexvalue : '',
            Agevalue :'',
            Areavalue : '',
            valid: false,
            error : false,
            nickerror : false,
            emptyerror : false,
            emptylist : [],
            emailRules: [
                v => !!v || '이메일 입력하세요',
                v => /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/.test(v) || '옳바른 이메일 입력하세요'
            ],
            passwordRules : [
                v => !!v || '패스워드를 입력하세요'
            ],
            nickRules : [
                v => !!v|| '닉네임을 입력하세요'
            ]
        }
    },
    methods: {
        register() {
             this.error = false,
             this.nickerror = false,
             this.emptyerror = false
             this.emptylist = []
             Register.fetch(this.email,this.password,this.Sexvalue,this.Agevalue,this.Areavalue,this.nickname)
                    .then((res) => {
                      
                      if(res.data.message === 'Sign up Completed') {
                           this.$router.replace({path : '/login'})
                      }else if(res.data.message === 'Already register Nickname') {
                           this.nickerror =true
                      }else if(res.data.message === 'Empty information') {
                          this.emptyerror = true;
                          res.data.data.forEach((data) => {
                              if(data === 'email')this.emptylist.push('이메일')
                              if(data === 'password')this.emptylist.push('비밀번호')
                              if(data === 'nickname')this.emptylist.push('닉네임')
                              if(data === 'area')this.emptylist.push('지역')
                              if(data === 'age')this.emptylist.push('나이')
                              if(data === 'sex')this.emptylist.push('성별')
                              
                          })
                         
                      }
                    })
                    .catch(() => {
                        this.error = true
                    })
            
            
              
        
        }
    }
    
}
</script>