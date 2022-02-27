<template>
  <div class="container">
    <el-row>
      <el-col :span="24" class="padding-all-lg">
        <h1 class="text-center padding-left-lg padding-right-lg">{{detail.title}}</h1>
      </el-col>
  
      <el-col :span="22" :offset="1">
        <div class="flex align-center mes-head">
          <img class="head" src="../../assets/images/head.jpg">
          <span class="margin-left-xs">{{detail.author}}</span>
          <span class="margin-left fontcolor2">{{detail.createTime}}</span>
          <span class="tag margin-left">{{detail.classification == undefined ? "未分类" : detail.classification}}</span>
        </div>
      </el-col>
  
      <el-col :span="24" class="markdown-body padding-all-lg padding-left-lg padding-right-lg">
        <div class="font15 content" v-html="detail.content"></div>
      </el-col>
      
    </el-row>
    <!-- <comment :articleId="$route.params.id"></comment> -->
    <sideTool :menus="menus"></sideTool>
  </div>

</template>

<script>
import article from "../../api/article"
import "../../libs/strDate";
import sideTool from "../../components/side_tool"
//import comment from "./comment"
import { mapState, mapActions } from "vuex"

export default {
  components: {
    sideTool//,
    //comment
  },
  data() {
    return {
      // menus:['回到顶部','收藏','QQ分享']
      menus:['回到顶部', 'QQ分享']
    };
  },
  
  computed: {
    ...mapState({
      detail: state => state.article.detail
    })
  },

  created() {
    this.$store.commit("updateLoad", true);
    this.getArticleDetail().then(ret => {
      this.$store.commit("updateLoad", false);
    })
  },

  methods: {
    ...mapActions(['getArticleDetail'])
  }
};
</script>

<style scoped lang="scss">
.container {
  min-height: calc(100vh - 60px);
  padding-bottom: 60px;
}
.head {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.tag {
  display: block;
  font-size: 12px;
  border: 1px solid rgba(236, 97, 73, 0.7);
  color: rgba(236, 97, 73, 0.7);
  border-radius: 4px;
  padding: 1px 3px;
}
.content {
  width: 100%;
}
</style>