<template>
  <div id="app">
    <cloud :data="words" :fontSizeMapper="fontSizeMapper" />
  </div>
</template>
 
<script>
import Cloud from 'vue-d3-cloud'
import { Petitions } from '../api'
export default {
    name: 'app',
    data() {
        return {
            words : [
                
            ],
            fontSizeMapper: word => Math.log2(word.value) * 5,
        }
    },
    created() {
        this.getKeyword()
    },
    methods : {
        getKeyword () {
            Petitions.getKeyword()
                     .then((res)=> {
                         const data = res.data;
                          let temp = []
                         let count = 0;
                        
                         
                       

                        let reducer = function(accumulator, value, index, array) {
                            if(accumulator.hasOwnProperty(value)) {
                                accumulator[value] = accumulator[value] + 5;
                            }else {
                                accumulator[value] = 5
                            }
                            return accumulator;
                        }
                        let initialValue = {};
                        let result = data.reduce(reducer, initialValue);
                        
                        for(let key in result){
                            this.words.push({text:key,value : result[key]})
                        }

                     })
                     
                  console.log(this.words)
        }
    },
    components: {
        Cloud,
    }}

</script>
<style>
#app{
    margin-bottom :150px;
}
</style>