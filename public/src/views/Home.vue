<template>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6>
            <ul>
                <div>
                  <v-card width=700 height=300>
                 
                    <v-toolbar-title class="toolbar-title">청원수 Top 5</v-toolbar-title>
                    <span  v-for="(p, index) in Top5petitions" :key="index" class="petition">
                     <router-link :to="{ name : 'detail', query: {title : p.제목,link : p.링크, count : p.참여인원, id : p.번호, isHome : true}}"><span  @click="openModal" class="black--text">{{index+1}}. {{p["제목"]}}</span></router-link>
                    </span>
                  </v-card>
                </div>
            </ul>

            <v-card>
              <router-view v-if="showModal"></router-view>
            </v-card>
            
        </v-flex>
        <v-flex xs12 sm6 >
          <v-card width=700 height=300 >
            <v-toolbar-title class="toolbar-title">항목별 청원</v-toolbar-title>
              <GChart
                
                  v-if="!isEmpty"
                  type="LineChart"
                  :data="chartData"
                  :options="chartOptions"
              />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  import { GChart } from 'vue-google-charts'
  import { Petitions } from '../api'
  import { eventBus } from '../main.js'
  export default {
    components: {
      GChart
    },
    data () {
      return {
             showModal : false,
             Top5Empty : true,
             isEmpty : true,
             petitions :[],
             Top5petitions : [],
             chartData: [
                        ['item','청원수'],
                        ['정치개혁',0],
                        ['경제민주화',0],
                        ['교통/건축/국토',0],
                        ['문화/예술/체육/언론',0],
                        ['반려동물',0],
                        ['행정',0],
                        ['인권/성평등',0],
                        ['육아/교육',0],
                        ['외교/통일/국방',0],
                        ['안전/환경',0],
                        ['보건복지',0],  
                        ['기타',0]
                    ],
                    chartOptions : {
                        title : '카테고리별 청원',
                        width: 700,
                        height: 240,
                        fontSize:9,
                        animation: { 
                                    startup: true,
                                    duration: 1000,
                                    easing: 'linear' },
                        



                     
                    }

      }
      
    },
    created() {
        this.getPetitions()
     
        let self = this
        eventBus.$on('close', () => {
              self.showModal = !self.showModal
             
          })
    },
    methods : {
      
         getPetitions () {
            Petitions.fetch()
                    .then((data) => {
                      
                        this.Top5Empty = false;
                        this.isEmpty = false;
                        this.petitions = data
                        
                    })
                    .catch(() => {
                       this.$store.dispatch('logout')
                    })
                    
        },
        openModal () {
          this.showModal = true;
       
        }
    },
    watch : {
      isEmpty : function() {
            this.petitions.forEach(petition => {
                for(let key in petition){
                    this.chartData.forEach(data => {
                        if(petition[key]["분류"] === data[0])
                        {
                            data[1]++
                        }
                    })
                }
            })
        },
      Top5Empty : function () {
         let top10 = this.petitions[0];
         for(let key in top10){
            if(this.Top5petitions.length<5){
              this.Top5petitions.push(top10[key])
              
            }
         }
      }
    }
}
</script>
<style>
a{
  color : black;
}
.petition{
    display:block;
    margin-bottom: 30px;
    margin-left:15px;
}
.toolbar-title{
  text-align: center;
  margin-bottom: 30px;
}
</style>