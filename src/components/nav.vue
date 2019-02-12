<template>
  	
  <div class="flex align-center justify-between el-header">
  	<router-link tag="a" to="/index" class="fontcolor2 font17 margin-left margin-right">首页</router-link>
  	
  	<div class="flex align-center">
  		<el-button size="medium" @click="addArticle" type="primary">写文章</el-button>
  		
  		
  		<el-dropdown v-if="user.userId" @command="handleCommand">
			  <div class="head-box flex align-center pointer">
	  			<img src="../assets/images/head.jpg" />
	  			<span class="margin-left nowrap">{{user.nickName}}</span>
	  		</div>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item command="user">个人中心</el-dropdown-item>
			    <el-dropdown-item command="logout">退出</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
			
  		<el-button v-else @click="$router.push({path:'/login'})" size="medium">登录</el-button>
			
  	</div>
  </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
     
    }
  },
  
  computed: {
  	...mapState({
      user: state => state.user.info
    })
  },
  
  mounted() {
  	if(!this.user.userId && window.localStorage.getItem('jianbaba-token')) {
  		this.getUserInfo()
  	}
  },
  
  methods: {
  	...mapActions(['getUserInfo']),
  	
  	login() {
  		console.log(222)
  	},
  	
  	logout() {
  		window.localStorage.removeItem('jianbaba-token')
  		window.localStorage.removeItem('jianbaba-userInfo')
  		this.$store.commit('setUserInfo',{})
  		console.log(window.localStorage.removeItem('jianbaba-token'))
  	},
  	
		handleCommand(command) {
	    switch(command)
		  {
		  	//登出
			  case 'logout':
			    this.logout()
			    break;
			  case 'user':
			    this.$router.push({
			    	name:'userInfo'
			    })
			    break;
		  }
	 	},
  	
  	addArticle() {
  		this.$router.push({
  			path:'/article/add'
  		})
  	}
   }
}
</script>

<style lang="scss" scoped>
.el-header {
	position: fixed;
	left: 0;
	top: 0;
	background-color: #fff;
	border-bottom: 1px solid #f0f0f0;
	height: 60px;
	width: 100%;
	z-index: 100;
	padding: 0 20px;
	padding-right: calc(32px - 100vw + 100%) !important;
}

.head-box {
	height: 40px;
	margin: 0 10px 0 30px;
	
	span {
		display: block;
		max-width: 150px;
	}
	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		box-shadow: 0 0 5px rgba(0,0,0,.8);
	}
}

</style>
