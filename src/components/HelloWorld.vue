<template>
  <div class="hello"></div>
  <h1>{{ msg }}</h1>
  <button @click="func0">add</button>{{ value0 }}
  <button @click="func1">addPtr</button>{{ value1 }}
  <button @click="func2">initArray</button>{{ value2 }}
</template>

<script>
import { add, addPtr, initArray } from '@/myDll'/**/
import { reactive,ref} from 'vue'/**/
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup(){
    const value0 = ref(0)
    const value1 = ref(1)
    let value2 = reactive([])
    function func0(){
      value0.value = add(1, 2)
    }
    function func1(){
      value1.value = addPtr(2, 2)
    }
    function func2(){
      let myArray = initArray(4)
      for (var i = 0; i < myArray.length; i++) {
        value2[i] = myArray[i]
      }
    }
    return {
      value0, value1,value2,  func0, func1, func2/**/
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
