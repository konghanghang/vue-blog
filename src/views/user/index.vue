<template>
	<el-container style="height: 100%;">
	  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
	    <el-menu router :default-active="$route.name">
	      <el-menu-item
	        v-for="menu in menuList"
	        :key="menu.index"
	      	:index="menu.index" 
	      	:route=menu.route>
	        <i :class="menu.icon"></i>
	        <span slot="title">{{menu.title}}</span>
	      </el-menu-item>
	    </el-menu>
	  </el-aside>
	  
	  <el-container style="padding: 20px;">
	  	
	  	<el-row>
	  		<el-col :span="24">
	  			<template v-if="$route.name == 'userInfo'">
			    	{{user}}
			    </template>
			    <template v-if="$route.name == 'userArticle'">
			    	文章列表
			    	<ol>
			    		<li v-for="(article,index) in articleList" :key = "index">
		    				<router-link :to="{path:'/article/' + article.id}">{{article.title}}</router-link>
			    			<span class="fl-r">
			    				{{article.createDate | strDate}}
			    				
			    				<el-button @click="goEdit(article.id)" :disabled="loading" type="primary" size="mini" class="margin-left-lg">修改</el-button>
			    				<el-button @click="del(article)" :disabled="loading" size="mini">删除</el-button>
			    			</span>
			    		</li>
			    	</ol>
			    	
			    	<pagination :pageModel="articlePage"></pagination>
			    	
			    </template>
	  		</el-col>
	  		
	  	</el-row>
	  	
	  </el-container>
	</el-container>

</template>

<script>
import article from "../../api/article"
import "../../libs/strDate"
import pagination from "../../components/pagination"
import {mapState, mapActions} from 'vuex'
export default {
  components: {
  	pagination
  },
  data() {
    return {
      menuList:[
        {
          index:'userInfo',
          title:'个人信息',
          icon:'el-icon-menu',
          route:{
            name:'userInfo'
          }
        },
        {
          index:'userArticle',
          title:'我的文章',
          icon:'el-icon-tickets',
          route:{
            name:'userArticle',
            params:{
              page:1
            }
          }
        },
        {
          index:'3',
          title:'我的回复',
          icon:'el-icon-edit-outline',
          route:{
            name:this.$route.name
          }
        },
        {
          index:'4',
          title:'收到评论',
          icon:'el-icon-star-off',
          route:{
            name:this.$route.name
          }
        },
        {
          index:'5',
          title:'消息通知',
          icon:'el-icon-message',
          route:{
            name:this.$route.name
          }
        },
        {
          index:'6',
          title:'爬虫测试',
          icon:'el-icon-message',
          route:{
            name:'crawler'
          }
        }
      ],
      
      articleList:[],
      articlePage:{},
      loading:false
    };
  },
  
  computed: {
  	...mapState({
      user: state => state.user.info
    }),
    
    page() {
    	return this.$route.params.page
    }
  },

  created() {
    this.initialization()
  },

  methods: {
  	//初始化数据
  	initialization() {
  		if(this.$route.name == 'userArticle') {
  			this.getMyArticle()
  		}
  	},
  	
    async getMyArticle() {
    	/*this.$store.commit("updateLoad", true);
    	article.self(this.page).then(ret => {
    		console.log(ret)
    		this.articleList = ret.data.data.list
    		this.articlePage = ret.data.data.pageModel
    		this.$store.commit("updateLoad", false);
    	}).catch(err => {
				this.$message.error(err.data.message);
    		this.$store.commit("updateLoad", false);
    	})*/
    	this.$store.commit("updateLoad", true);
    	try {
    	  const ret = await article.self(this.page)
    	  this.articleList = ret.data.data.list
        this.articlePage = ret.data.data.pageModel
        this.$store.commit("updateLoad", false);
    	} catch(err) {
    	  console.log(err)
    	  //this.$message.error(err.data.message);
        this.$store.commit("updateLoad", false);
    	}
    },
    
    goEdit(id) {
    	this.$router.push({
    		name:'articleEdit',
    		params:{
    			articleId:id
    		}
    	})
    },
    
    del(art) {
    	this.loading = true
    	article.delete(art.id).then(ret => {
    		this.$message({
          message: "删除成功",
          type: "success"
        });
    		this.articleList = this.articleList.filter(l => l.id != art.id)
    		this.loading = false
    	}).catch(err => {
				this.$message.error(err.data.message);
    		this.loading = false
    	})
    }
  },
  
  watch: {
  	$route() {
  		this.initialization()
  	}
  }
};
</script>

<style scoped lang="scss">
.el-row {
	width: 100%;
}
ol {
	li {
		margin-top: 15px;
		line-height: 28px; 
		&:after {
			display: block;
			content: "";
			clear: both;
		}
		.fl-r {
			float: right;
		}
	}
}
.pagination {
	margin-top: 60px;
	margin-bottom: 20px;
}
</style>