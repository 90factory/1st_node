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
      <v-toolbar-title><b>꺼청닷컴</b></v-toolbar-title>
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
import { mapState } from 'vuex'
import { Search } from './api'

import { eventBus } from './main.js'
  export default {
    data: () => ({
      keyward : ''
    }),
    computed: {
      ...mapState(['isLogin'])
    },
    created() {
   
    },
    methods: {
    
      searchEvent () {
          
         
          Search.fetch(this.keyward)
                .then(res => {
                   eventBus.$emit("SearchedPetitions",res)   
                })
              
          this.$router.push({path : '/searchresult'})
          this.keyward = ''
      }
    },
  }
</script>
<style>

</style>