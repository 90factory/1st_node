<template>
    <v-container>
        <v-layout>
            <v-flex>
                <h1>최근 읽은 게시물</h1>
                
                <div v-for="(result,index) in data[0]" :key="index">
                    <span>{{data[0][index].제목}}</span>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import {UserInfo} from '../api';
export default {
    data() {
        return {
            isEmpty : true,
            data : [],
            result : []
        }
    },
    created() {
        this.getHistory()
    },
    methods: {
        getHistory() {
            UserInfo.getHistory()
                    .then((res) => {
                        this.isEmpty = false;
                        this.data.push(res.data);
                    })
        }
    }
    
}
</script>