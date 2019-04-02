<template>
    <div>
        <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              
            </slot>
          </div>
          
           <h3> {{this.$route.query.title}} </h3>
           <h4>{{this.$route.query.count}}</h4>
           <h1 v-if="isEmpty">{{message}}</h1>
          <div class="modal-body">
            <slot name="body">
               <GChart
                v-if="!isEmpty"
                type="PieChart"
                :data="AgeData"
                :options="AgeOptions"
            />
            <GChart
                v-if="!isEmpty"
                type="PieChart"
                :data="SexData"
                :options="SexOptions"
            />

             <GChart
                v-if="!isEmpty"
                type="BarChart"
                :data="AreaData"
                :options="AreaOptions"
            />
          
            <div>
              
            </div>
            </slot>

            <slot name="footer">
              <span class="black--text"><b><v-btn @click="close">종료하기</v-btn></b></span>
              <span class="black--text"><b><v-btn @click="recommend">공감하기</v-btn></b></span>
              <router-link :to="{name : 'chatting', query : {title : this.$route.query.title}}"><span class="black--text"><b><v-btn>대화방 참여</v-btn></b></span></router-link> 
              <a><span class="black--text"><b><v-btn @click="openNewTab">원문 보기</v-btn></b></span></a> 
            </slot>
          </div>

         
        </div>
      </div>
    </div>
  </transition>
       
      
        
    </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import {User} from '../api'
import {UserInfo} from '../api'
import {Token} from '../api';
import {Petitions} from '../api'
import axios from 'axios'
import router from '../router'
export default {

    components : {
        GChart
    },
     data () {
        return {
                    
                    isEmpty : true,
                    userInfo : '',
                    AgeData: [
                      ['age','공감수'],
                      ['10대',0],
                      ['20대',0],
                      ['30대',0],
                      ['40대',0],
                      ['50대',0]
                    ],
                    SexData : [
                      ['sex','공감수'],
                      ['남자',0],
                      ['여자',0],
                    ],
                    AreaData : [
                      ['area','공감수'],
                      ['경기도',0],
                      ['강원도',0],
                      ['충청남도',0],
                      ['충청북도',0],
                      ['경상북도',0],
                      ['경상남도',0],
                      ['전라북도',0],
                      ['전라남도',0],
                      ['제주도',0]
                    ],
                    AgeOptions : {
                        title : '연령별 분포',
                         animation: { 
                                    startup: true,
                                    duration: 1000,
                                    easing: 'linear' }
                    },
                    SexOptions : {
                        title : '성별 분포',
                         animation: { 
                                    startup: true,
                                    duration: 1000,
                                    easing: 'linear' }
                    },
                    AreaOptions : {
                         title : '지역별 분포',
                          width : 600,
                          animation: { 
                                    startup: true,
                                    duration: 1000,
                                    easing: 'linear' }
                        
                    },
                    message : ''
        }
    },
    created() {
        this.getUsers()
        this.addHistory()
        
    },
    

    methods : {
        getUsers () {
            const ID = this.$route.query.link.substring(39,this.$route.query.link.length)
            User.fetch(ID)
                .then((res)=> {
                  
                  this.isEmpty = false;
                  this.userInfo = res.data;
                  if(res.data.message === 'No Recommend'){
                    this.message = "해당 청원에 공감한 사람이 없습니다."
                    this.isEmpty = true;
                  }
                
                })
                .catch(() => {
                  //this.$store.dispatch('logout')
                  Token.getNewToken()
                       .then(res => {
                          if(res.status === 200){
                            const newToken = res.data.token
                            localStorage.removeItem('access-token')
                            localStorage.setItem('access-token',newToken);
                            const accessToken = localStorage.getItem('access-token');
                            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                            this.$router.replace({name : 'home'})
                          }
                       })
                       .catch(()=>{
                        
                            this.$store.dispatch('logout')
                      
                       })

                })
        },
        close () {
          if(this.$route.query.isResult){
            router.back(-1)
          }
          else if(this.$route.query.isHistory){
            router.back(-1)
          }
          else if(this.$route.query.isHome){
            router.back(-1)
          }
          
        },
        openNewTab() {
          window.open(this.$route.query.link,"_blank");
        },
        addHistory(){
          
          const ID = this.$route.query.link.substring(39,this.$route.query.link.length)
          UserInfo.addHistory(ID)
                  
        },
        recommend(){
          const ID = this.$route.query.link.substring(39,this.$route.query.link.length)
          Petitions.postRecommend(ID)
                   .then((res) => {
                    
                      if(res.data.message === 'Already Recommend') {
                          alert('이미 공감하신 청원 입니다.')
                          router.back(-1)
                      }
                      else{
                        router.back(-1)
                      }
                   })
        }      
    },
    watch: {
     
      isEmpty: function() {
          
         this.userInfo.forEach(element => {
           
              this.AgeData.forEach(data => {
                if(data[0] === element.age){
                  data[1]++
                }
              })
              this.SexData.forEach(data => {
                if(data[0] === element.sex){
                  data[1]++
                }
              })
              this.AreaData.forEach(data => {
                if(data[0] === element.area){
                  data[1]++
                }
              })
           
        })
    }
    
  }
}
</script>
<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  font-family: 'Do Hyeon', sans-serif;
}

.modal-default-button {
  float: right;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

a{
  color : black;
  text-decoration: none;
  font-family: 'Do Hyeon', sans-serif;
}
</style>
