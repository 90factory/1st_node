<template>
    <v-container>
        <v-layout>
            <v-flex>
                <h1>최근 읽은 게시물</h1>
                <div v-for="(id,index) in data" :key="index">
                    {{id}}
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
            data : ''
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
                        this.data = res.data.history
                    })
        }
    },
    watch: {
        isEmpty : function(){

        }
    },
}
</script>