<template>
  <v-app id="inspire">
    
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat active-class="v-btn--inactive" router :to="{name: 'home'}">Home</v-btn>
        <v-btn flat active-class="v-btn--inactive" v-if="!isLogin" router :to="{name: 'login'} ">로그인</v-btn>
        <v-btn flat active-class="v-btn--inactive" v-if="!isLogin" router :to="{name: 'register'} ">회원가입</v-btn>
        <v-btn flat active-class="v-btn--inactive" v-if="isLogin" @click="$store.dispatch('logout')">로그아웃</v-btn>
        <v-btn flat active-class="v-btn--inactive" v-if="isLogin" router :to="{name: 'setting'}">개인정보 수정</v-btn>
        <v-btn flat active-class="v-btn--inactive" v-if="isLogin" router :to="{name: 'history'}">최근 읽은 게시물</v-btn>    

      </v-toolbar-items>
                <v-flex xs-12>
                   <v-text-field
                        v-model="keyward"
                        full-width
                        flat
                        label="Search"
                        solo-inverted
                        placeholder = "검색 내용 입력하세요"
                        class="mt-2"
                    >
                    </v-text-field>
                 </v-flex>
                     <v-btn flat @click.prevent="searchEvent">검색</v-btn>
      <v-toolbar-title>꺼청닷컴</v-toolbar-title>
    </v-toolbar>
    
    
    <v-content>
      <router-view></router-view>
    </v-content>
    
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>

  
</template>

<script>
import { mapState,mapActions } from 'vuex'
import { Search,Login } from './api'
import { eventBus } from './main.js'
  export default {
    data: () => ({
      keyward : ''
    }),
    computed: {
      ...mapState(['isLogin'])
      
    },
    created() {
      
      this.snsLogin()
    },
    methods: {
      ...mapActions(['loginSNS']),
      searchEvent () {
          
         
          Search.fetch(this.keyward)
                .then(res => {
                   eventBus.$emit("SearchedPetitions",res)   
                })
              
          this.$router.push({path : '/searchresult'})
          this.keyward = ''
      },
      snsLogin() {
           const token =  this.$cookies.get('token')
           const email = this.$cookies.get('email')
           
           if(token !== null && email !== null) {
               Login.getSnsMember(email)
                .then((res)=>{
                    const SnsMemberInfo = res.data
                    let isNewMember = false;

                    sessionStorage.setItem('Nickname',SnsMemberInfo.Nickname)
                    sessionStorage.setItem('Sex',SnsMemberInfo.Sex)
                    sessionStorage.setItem('Area',SnsMemberInfo.Area)
                    sessionStorage.setItem('Age',SnsMemberInfo.Age)
                    if(SnsMemberInfo.Nickname === null){
                      isNewMember = true;
                    }
                     
                     this.loginSNS({token,email,isNewMember});
                 
                })
              
           
           }
      }
    },
  }
</script>
<style>
  .v-toolbar,.v-btn,span,div{
    font-family: 'Jua', sans-serif;
    font-size: 18px;
  }
</style>