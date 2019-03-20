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
                <v-card>
                    <v-toolbar flat>
                    <v-toolbar-title>회원가입</v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3">
                    <v-text-field
                    label="email"
                    v-model="email"
                    >
                    </v-text-field>
                    <v-text-field
                    label="password"
                    v-model="password"
                    type="password"
                    >
                    </v-text-field>
                    <v-text-field
                    label="닉네임"
                    v-model="nickname"
                    type="name"
                    >
                    </v-text-field>
                    <v-select
                    :items="Sexitems"
                    v-model="Sexvalue"
                    label="성별"
                    ></v-select>
                    <v-select
                    :items="Areaitems"
                    label="지역"
                    v-model="Areavalue"
                    ></v-select>
                    <v-select
                    :items="Ageitems"
                    label="나이"
                    v-model="Agevalue"
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
            error : false
        }
    },
    methods: {
        register() {

            Register.fetch(this.email,this.password,this.Sexvalue,this.Agevalue,this.Areavalue,this.nickname)
                    .then(() => {
                      
                      this.$router.replace({path : '/login'})
                      
                    })
                    .catch(() => {
                        this.error = true
                    })
            
                        
              
        
        }
    },
}
</script>