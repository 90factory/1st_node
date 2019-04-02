<template> 
    <v-container fill-height style="max-width:450px;">
        <v-layout align-center row wrap>
            <v-flex xs12>


                <v-alert
                :value="isLoginError"
                type="error"
                class="mb-3"
                >
                아이디와 비밀번호를 확인해주세요
                </v-alert> 
                <v-alert 
                :value="isLogin"
                type="success"
                >
                로그인이 완료되었습니다.
                </v-alert>

                <v-card>
                    <v-toolbar flat>
                    <v-toolbar-title><v-btn flat large @click="changeDisplay"><b>일반로그인</b></v-btn><v-btn flat large @click="changeDisplay"><b>소셜 로그인</b></v-btn></v-toolbar-title>
                    </v-toolbar>
                    <div class="pa-3" v-if="show">
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
                    <v-btn 
                    color="primary"
                    large
                    block
                    depressed
                    @click="login({
                    email,
                    password
                    })"
                    >로그인
                    </v-btn>
                  
                    </div>
                     <div class="pa-3" v-if="!show">
                       
                        <a href="http://192.168.1.8:3000/facebook">
                          <v-img :src="`https://scontent-hkg3-2.xx.fbcdn.net/v/t39.2365-6/17639236_1785253958471956_282550797298827264_n.png?_nc_cat=105&_nc_ht=scontent-hkg3-2.xx&oh=11d8beb63a1e1841f638267df09e3927&oe=5D02CFEA`">
                          </v-img>
                        </a>
                     </div>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapState,mapActions} from 'vuex'

export default {
  
  data () {
        return { 
        email : null,
        password: null,
        show : true, 
        token : '',
        name : '',
        personalID : '',
        isConnected : false,
        }
  },
  computed: {
    ...mapState(['isLogin','isLoginError'])
  },
  
  methods : {
    ...mapActions(['login']),
    ...mapActions(['loginSNS']),
    changeDisplay () {
            this.show = !this.show
    }
   

  },
 
}
</script>