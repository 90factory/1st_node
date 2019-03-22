<template>
    <v-container>
        <v-layout>
            <v-flex>
                <h1>최근 읽은 게시물</h1>
                
                <v-list v-for="(result,index) in data[0]" :key="index">
                    <router-link :to="{ name : 'historyresult', query: {title : data[0][index].제목,link : data[0][index].링크, count : data[0][index].참여인원, id : data[0][index].번호, isHistory : true}}">
                      <span  @click="openModal" class="black--text">{{data[0][index].제목}}</span>
                    </router-link>
                </v-list>
                <v-card>
                    <router-view v-if="showModal"></router-view>
                </v-card>
            </v-flex>
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