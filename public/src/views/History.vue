<template>
    <v-container fluid grid-list-md>
        <v-layout>
                <v-flex xs12 sm6 md4 lg3 xl2>
                    <v-card class="justify-center" width="1800" height="800" xs12 sm6 md4 lg3 xl2>
                        <v-toolbar-title class="toolbar-title">최근 조회한 게시물</v-toolbar-title>
                        <span v-for="(result,index) in data[0]" :key="index"  class="history">
                        <router-link :to="{ name : 'historyresult', query: {title : data[0][index].제목,link : data[0][index].링크, count : data[0][index].참여인원, id : data[0][index].번호, isHistory : true}}">
                        <span  @click="openModal" class="black--text">{{data[0][index].제목}}</span>
                        </router-link>
                        </span>
                    </v-card>
                </v-flex>

                <v-card>
                    <router-view v-if="showModal"></router-view>
                </v-card>
           
        </v-layout>
    </v-container>
</template>
<script>
import {UserInfo} from '../api';
import { eventBus } from '../main.js'
export default {
    data() {
        return {
            isEmpty : true,
            data : [],
            result : [],
            showModal : false,
        }
    },
    created() {
        this.getHistory()

        eventBus.$on('close', () => {
              self.showModal = !self.showModal
              
        })
    },
    methods: {
        getHistory() {
            UserInfo.getHistory()
                    .then((res) => {
                        this.isEmpty = false;
                        this.data.push(res.data);
                    })
        },
         openModal () {
          this.showModal = true;
        }
    }
    
}
</script>
<style>
    .history{
        display:block;
        margin-bottom: 30px;
        margin-left:30px;
    }
   
</style>