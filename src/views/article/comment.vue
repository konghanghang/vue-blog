<template>
  <div>
    <el-row :gutter="20" class="padding-left-lg padding-right-lg comment">
      <el-col :span="3">
        <img class="head margin-top-xs" src="../../assets/images/head.jpg">
      </el-col>
      <el-col :span="21">
        <el-input type="textarea" :rows="2" v-model="content" @focus="showBtn = true" placeholder="说些什么吧~">
        </el-input>
        <div class="margin-top fl-c">
          <el-button v-show="showBtn" @click="newComment('article')" type="primary" size="small" class="fl-r margin-right-lg">发表</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row class="padding-left-lg padding-right-lg margin-top">
      <el-col :span="20" :offset="2">
        <h2>评论列表（{{commentList.length}}）</h2>
      </el-col>
    </el-row>

    <el-row v-for="(comment,index) in commentList" :key="index" class="padding-left-lg padding-right-lg comment-box" :style="index == 0 ? 'margin-top:0;' : ''">
      <el-col :span="20" :offset="2">
        <div class="flex align-center">
          <img class="head2" src="../../assets/images/head.jpg">
          <div>
            <p>{{comment.nickname}}</p>
            <p class="font12 fontcolor2">
              {{`${commentList.length - index}楼`}}
              <span class="margin-left">
                {{comment.createTime}}
              </span>
            </p>
          </div>
        </div>

        <div class="margin-top-sm">
          <span>{{comment.content}}</span>
        </div>
        <div class="padding-all fontcolor2 flex align-center">
          <span @click="approve(comment)" class="pointer comment-op" :class="comment.isApprove ? 'isApprove' : ''">
            <i class="iconfont icon-dianzan"></i>{{`${comment.approve}人赞`}}
          </span>
          
          <span @click="openChildComment(comment)" class="margin-left-lg pointer comment-op">
            <i class="iconfont icon-pinglun"></i>回复</span>
        </div>

        <div class="child-comment-box margin-top">
          <div v-for="(child,index) in comment.replayComment.list" class="child-comment" :key="index">
            <p>
              <span class="name pointer">{{child.nickname}}</span> 
              <span v-if="child.id == child.toId">：{{child.content}}</span>
              <span v-else>：
                <span class="name pointer">{{`@${child.toNickname} `}}</span>
                <span>{{child.content}}</span>
              </span>
            </p>
            <div class="padding-all-xs font12 fontcolor2">
              {{child.createTime}}
              <span @click="openChildComment(comment,child)" class="margin-left pointer">回复</span>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="20" :offset="2">
        <div v-if="comment.is_comment" class="child-comment-box padding-top-sm">
          <el-input type="textarea" :rows="2" v-model="child_form.content" :placeholder="child_form.placeholder">
          </el-input>
          <div class="margin-top fl-c">
            <el-button type="primary" size="small" @click="newComment('user')" class="fl-r margin-right-lg">发表</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    
    <el-row v-if="commentList.length == 0">
      <el-col :span="24" class="padding-all-lg text-center">
        <span>暂无评论~</span>
      </el-col>
    </el-row>
    
  </div>

</template>

<script>
  import comment from '../../api/comment'
  import article from '../../api/article'
  import "../../libs/strDate"
  export default {
    props: ['articleId'],
    data() {
      return {
        content:'',
        child_form: {
          placeholder:'写下你的评论~',
          content:'',
          articleId:this.articleId
        },
        showBtn: false,
        commentList:[],
        page: {
          pageNum:1
        }
      }
    },

    computed: {
    },

    created() {
      this.getCommentList()
    },

    mounted() {},

    computed: {},

    methods: {
      getCommentList() {
        let data = {
          articleId: this.articleId,
          page:this.page.pageNum
        }
        
        comment.list(data).then(ret => {
          console.log(ret)
          ret.data.data.list.forEach(v => {
            v.is_comment = false
            console.log(v)
          })
          console.log(ret.data.data.list)
          this.commentList = ret.data.data.list
          this.page = ret.data.data.pageModel
        }).catch(err => {
          console.log(err.data)
          this.$message.error(err.data.message);
        })
      },
      
      openChildComment(comment,child) {
        console.log(child)
        if(child) {
          this.child_form.toId = child.id
          this.child_form.toUser = child.createUser
          this.child_form.levelId = comment.id
          this.child_form.placeholder = `@${child.nickname}`
        } else {
          this.child_form.toId = comment.id
          this.child_form.toUser = comment.createUser
          this.child_form.levelId = comment.id
          this.child_form.placeholder = '写下你的评论~'
        }
        comment.is_comment = true
      },
      
      newComment(type) {
        let data = {}
        if(type == 'article') {
          data = {
            content: this.content,
            articleId: this.articleId,
            toUser: 0,
            toId: 0
          }
        }
        if(type == 'user') {
          data = this.child_form
        }
        comment.new(data).then(ret => {
          console.log(ret)
          this.$message({
            message: "发表评论成功",
            type: "success"
          });
          this.content = ''
          this.child_content = ''
          this.getCommentList()
        }).catch(err => {
          this.$message.error(err.data.message);
        })
      },
      
      approve(comment) {
        let num = 1;
        if(comment.isApprove) {
          num = -1;
        }
        let data = {
          linkId:comment.commentId,
          type:2,
          num: num
        }
        article.collect(data).then(ret => {
          if(comment.isApprove) {
            comment.isApprove = false
            comment.approve--
          }else{
            comment.isApprove = true
            comment.approve++
          }
        }).catch(err => {
          
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comment {
    margin: 70px 0 40px 0 !important;
  }
  
  .head {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    float: right;
  }
  
  .head2 {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .el-col-21 {
    max-width: 740px;
  }
  
  .comment-box {
    margin-top: 30px;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 30px;
    .child-comment-box {
      padding-left: 20px;
      border-left: 2px solid #d9d9d9;
      .child-comment {
        .name {
          color: #3194d0;
        }
      }
    }
  }
  
  .comment-op:hover {
    color: #404040;
  }
  
  .isApprove {
    color: #404040;
    .icon-dianzan {
      color: #ea6f5a;
    }
  }
</style>