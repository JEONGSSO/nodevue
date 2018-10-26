<template>
	<div id="app">
		<div id="nav">
			<h1>{{ttt}} :: <span v-if="isVisible"> {{visit}} </span> </h1>
			<input type="text" v-model="ttt" @keyup="visit++">   <!-- 위에 ttt 연동 -->
			<button @click="visitCount()">visitCount</button>
			<!-- <HelloWorld msg="welcom"/> -->
			<div>
				<span v-bind:title="message"> 
					바인딩 테스트 
				</span>
				<todo-item></todo-item>
			</div>
		</div>
	</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    //컴포넌트는 제이슨 X 함수로
    return {
      ttt: "홍길동",
      visit: 0,
      isVisible: false,
      message: "바인딩 테스트"
    };
  },
  methods: {
    visitCount() {
      this.visit++; //this 내 전역변수 visit를 찾음
      this.isVisible = true;
    }
  }
};

// Vue.components('todo-item', {
// 	template : '<li>할일 1</li>'
// })
</script>



<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
