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
                      <v-btn large>네이버 로그인</v-btn>
                      <v-btn large>페이스북 로그인</v-btn>
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
        }
  },
  
  computed: {
    ...mapState(['isLogin','isLoginError'])
  },
  
  methods : {
    ...mapActions(['login']),
    changeDisplay () {
            this.show = !this.show
    }

  }
}
</script>