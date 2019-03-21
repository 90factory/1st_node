<template>
    <v-container>
        <v-layout>
            <v-flex>
                <h1>검색결과</h1>
                
                 <v-list v-for="(result,index) in foundData" :key="index">
                    <router-link :to="{ name : 'result', query: {title : result.제목,link : result.링크, count : result.참여인원, id : result.번호, isResult : true}}">
                      <span  @click="openModal" class="black--text">{{index+1}}. {{result["제목"]}}</span>
                    </router-link>
                 </v-list>
                
                
                <v-card>
                <router-view v-if="showModal"></router-view>
                </v-card>
              
                
                <v-list v-if="foundData.length === 0">검색결과가 존재하지 않습니다.</v-list>
            </v-flex>
            
        </v-layout>
    </v-container>
</template>
<script>
import { eventBus } from '../main.js'
export default {
    data () {
        return {
            result : '',
            keyward : '',
            isEmpty : true,
            foundData : [],
            showModal : false,
        }
    },
    created() {
        let self = this
        
        eventBus.$on('SearchedPetitions',(data)=>{
                    self.result =  data.data
                    self.keyward = data.config.params.keyward
                      
                        if(this.foundData.length === 0){
                            self.searchKeyward()
                        }else {
                            this.foundData.splice(0,this.foundData.length)
                            self.searchKeyward()
                        }
        })
        
        eventBus.$on('close', () => {
              self.showModal = !self.showModal
              
        })
      
        
    },
    methods: {
        searchKeyward() {
           this.result.forEach(data => {
                for(let key in data){
                
                
                    if(data[key]["제목"].indexOf(this.keyward) !== -1){
                        this.foundData.push(data[key])
                    }
               
                
            }
           })    
           
        },
         openModal () {
          this.showModal = true;
        }
    }
  
    
}
</script>