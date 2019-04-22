<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <span v-once>메시지: {{ msg }}</span>
    <input type="text" v-model="msg">
    <span v-html="msg"></span>  <span class="red">{{reversedMessage}}</span>
    <button :disabled="isButtonDisabled" @click="isButtonDisabled = !isButtonDisabled">disabledButton</button>

    <div>
      <a href="#" @click.prevent="aaa()">
        aaaaaaa <span @click.stop="bbb()">bbbbbbbb</span>
      </a>
    </div>

    <div :class="{red:isButtonDisabled}">REDDDDDDD</div>

    <todo-item v-for="item in groceryList"
               :v-if="item.id > 0"
               :todo="item"
               :key="item.id">
    </todo-item>

    <todo-item :todo="groceryList[0]"></todo-item>
    <todo-item :todo="{id:9999, text: '999999'}"></todo-item>

    <div v-if = isButtonDisabled>Yessssssssssssssssssssss</div>
    <div v-else>nooooooooooooooo</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import TodoItem from '@/components/TodoItem'
export default {
  name: 'home',
  components: {
    TodoItem
  },
  computed: {
    reversedMessage() {
      return this.msg.split('').reverse().join('')
    }
  },
  watch: {
    msg: function() {
      console.log("............", this.msg)
      // this.reversedMessage = this.msg + "::"
    }
  },
  methods: {
    aaa(e) {
      console.log("aaaaaaaaaaaaaaaaaaa", e)
    },
    bbb() {
      console.log("bbbbbbbbbbbbbb")
    }
  },
  data() {
    return {
      msg: 'abcd',
      isButtonDisabled: false,
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}
</script>

<style>
  .red { color: red; }
</style>