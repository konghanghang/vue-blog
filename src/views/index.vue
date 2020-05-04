<template>
  <el-row :class="{'visibility':$store.state.dot}">
    <!--轮播
    <el-row style="margin-top: 15px;">
      <el-col :span="24">
        <el-carousel height="260px">
          <el-carousel-item v-for="item in 5" :key="item">
            <img class="carousel-img" :src="imgs[item-1]">
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>-->

    <!--内容主题-->
    <el-row 
      class="container" 
      v-infinite-scroll="fetchMore" 
      infinite-scroll-disabled="more"
      infinite-scroll-immediate-check="fale"
      infinite-scroll-distance="500">

      <!--左栏-->
      <el-col :span="16">

        <template v-for="(mes,index) in articleList">
          <el-col :span="24" class="mes-card" :key="index">
            <el-col :span="24">
              <div class="flex align-center mes-head">
                <img class="head" src="../assets/images/head.jpg">
                <span class="margin-left-xs">{{mes.author}}</span>
                <span class="margin-left fontcolor2">{{mes.createDate | strDate}}</span>
              </div>
            </el-col>

            <el-col :span="24" class="flex align-center">
              <el-col :span="17">
                <!--标题-->
                <h3 style="margin-top: 12px;margin-bottom: 12px;">
									<router-link tag="a" class="title" :to="{name:'detail',params:{id:mes.id}}">{{mes.title}}</router-link>
								</h3>

                <!--正文-->
                <div class="content" v-html="mes.description"></div>
              </el-col>

              <el-col :span="6" :offset="1">
                <img class="mes-img" :src="getImage(mes.coverImage) + '?imageView2/2/w/200'" />
              </el-col>
            </el-col>

            <el-col :span="24" class="margin-top">
              <div class="flex align-center mes-bottom font12">
                <span class="tag">{{mes.classification}}</span>
                <span class="margin-left fontcolor2">已读：{{mes.countView || 0}}</span>
                <span class="margin-left fontcolor2">评论：{{mes.countComment || 0}}</span>
                <span class="margin-left fontcolor2">收藏：{{mes.countCollection || 0}}</span>
              </div>
            </el-col>
          </el-col>
        </template>

      </el-col>

      <!--右栏-->
      <el-col :span="7" :offset="1">
        <el-col :span="24" class="margin-bottom-xs">
          <p class="fontcolor2">文章精选</p>
        </el-col>

        <el-col v-for="(article,index) in careChosenList" :key="index" :span="24" class="flex align-center" :class="{'margin-top-lg':index > 0}">
          <el-col :span="6" class="flex align-center">
            <img :src="getImage(article.coverImage) + '?imageView2/2/w/80'">
          </el-col>
          <el-col :span="17" :offset="1" class="flex align-center">
            <router-link :to="{path:'/article/' + article.id}" style="color:#333;">{{article.title}}</router-link>
          </el-col>
        </el-col>
        
        <el-col :span="24" class="margin-top-lg">
          <!--<iframe
            frameborder="0"
            height="500"
            src="http://www.daiwei.org/vue-music.html#/mymusic">
          </iframe>-->
        </el-col>

      </el-col>

    </el-row>
    
    <sideTool :menus="menus"></sideTool>
  </el-row>
</template>

<script>
  import sideTool from "../components/side_tool"
  import article from "../api/article"
  import "../libs/strDate";
  import { mapState, mapActions } from "vuex"
  import util from "../libs/util"

  export default {
    components: {
      sideTool
    },
    data() {
      return {
        // imgs: [
        //   "http://upload.jianshu.io/admin_banners/web_images/3919/a83382c5357faa5fd5c0e48f03fa078dcb7c5405.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540",
        //   "http://upload.jianshu.io/admin_banners/web_images/3923/aad0916d50f59176e2270fb468642e03f760aec4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540",
        //   "http://upload.jianshu.io/admin_banners/web_images/3911/f150361d64193f9a80b07ee2538e80f1271f6ffc.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540",
        //   "http://upload.jianshu.io/admin_banners/web_images/3908/af1af14d3a9789609d6dee9906c0c3f127a6e28a.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540",
        //   "http://upload.jianshu.io/admin_banners/web_images/3916/8199484f8bf4d10036f253865919561eaedabcfd.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"
        // ],
        
        menus:['回到顶部'],

        careChosenList: []
      };
    },

    created() {
      if(this.articleList.length == 0) {
        this.$store.commit("updateDot", true);
      }
      
      this.$store.commit("updateLoad", true);
      Promise.all([this.getArticleList(),this.getCareChosen()])
        .then(() => {
          this.$store.commit("updateDot", false);
          this.$store.commit("updateLoad", false);
        })
        .catch(err => {
          this.$store.commit("updateDot", false);
          this.$store.commit("updateLoad", false);
        });
      this.$store.commit('setMore',false)
    },

    computed: {
      ...mapState({
        articleList: state => state.article.list,
        page: state => state.article.page,
        more: state => state.loadMore.more
      })
    },

    methods: {
      ...mapActions(['getArticleList', 'loadMore']),

      getCareChosen() {
        let _this = this;
        return new Promise(function(resolve, reject) {
          article.careChosenList().then(ret => {
              _this.careChosenList = ret.data;
              resolve();
            })
            .catch(err => {
              console.log("load error!");
              reject(err);
            });
        });

      },

      getImage(url) {
        return util.getImage(url)
      },
      
      fetchMore() {
        let page = Object.assign({},this.page)
        this.loadMore({page:page,fetchData:this.getArticleList})
      }
    }
  };
</script>

<style scoped lang="scss">
  img {
    width: 100%;
    height: 100%;
  }
  
  .container {
    margin-top: 40px;
  }
  
  .mes-card {
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
    .mes-head {
      .head {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    h3 {
      font-size: 18px;
    }
    .mes-img {
      width: 100%;
      border-radius: 5px;
    }
  }
  
  .mes-bottom {
    .tag {
      display: block;
      border: 1px solid rgba(236, 97, 73, 0.7);
      color: rgba(236, 97, 73, 0.7);
      border-radius: 4px;
      padding: 1px 4px;
    }
  }
</style>