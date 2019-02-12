<template>
  <ul v-if="show">
    <el-tooltip 
      v-for="menu in showMenu" 
      :key="menu.name" 
      effect="dark" 
      :content="menu.name"
      placement="left">
      <li @click="menu.click">
        <i class="iconfont" :class="menu.icon"></i>
      </li>
    </el-tooltip>
    
    <li @click="showMusic">
      <svg class="music-icon" aria-hidden="true">
        <use xlink:href="#icon-music"></use>
      </svg>
    </li>
  </ul>
</template>

<script>
  import article from "../api/article"
  import { mapState, mapActions } from "vuex"
  import util from "../libs/util";
  export default {
    props:['menus'],
    data() {
      return {
        show:true,
        
        menuList:[
          {
            name:'回到顶部',
            icon:'icon-shangla',
            click:() => {
              this.goTop()
            }
          },
          {
            name:'收藏',
            icon:'icon-shoucang',
            click:() => {
              this.collect()
            }
          },
          {
            name:'QQ分享',
            icon:'icon-tubiao212',
            click:() => {
              this.share()
            }
          }
        ],
        
        showMenu:[]
      }
    },
    
    computed: {
      ...mapState({
        detail: state => state.article.detail
      })
    },
    
    created() {
      this.showMenu = []
      if(this.menus) {
        this.menus.forEach(m => {
          this.showMenu.push(this.menuList.find(i => i.name === m))
        })
      }
    },

    mounted() {
      /*window.onscroll = (e) => {
        if(window.pageYOffset > 1000){
          this.show = true
        }else{
          this.show = false
        }
      }*/
      if(this.$route.name == 'detail') {
        this.showMenu.find(m => m.name == '收藏').icon = this.detail.isCollect ? 'icon-shoucang1' : 'icon-shoucang'
      }
    },

    methods: {
      goTop() {
        var _this = this
        var timer = setInterval(function () {
          var currentPosition = window.pageYOffset
          currentPosition -= 100
          if (currentPosition > 0) {
            window.scrollTo(0,currentPosition)
          }else {
            window.scrollTo(0,0)
            clearInterval(timer)
          }
        }, 10)
      },
      
      collect() {
        let addNum = 1;
        if(this.detail.isCollect){
            addNum = -1;
        }
        let data = {
          linkId:this.$route.params.id,
          num: addNum
        }
        article.collect(data).then(ret => {
          let detail = Object.assign({}, this.detail)
          detail.isCollect = !detail.isCollect
          this.$store.commit('setArticleDetail',detail)
          console.log(ret)
        }).catch(err => {
          
        })
      },
      
      getImage(url) {
        return util.getImage(url)
      },
      
      share() {
        var p = {
          url:location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
          desc:'这篇文章不错~', /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
          title:this.detail.title, /*分享标题(可选)*/
          summary:this.detail.description, /*分享摘要(可选)*/
          pics:this.getImage(this.detail.coverImage), /*分享图片(可选)*/
          flash: '', /*视频地址(可选)*/
          site:'QQ分享', /*分享来源(可选) 如：QQ分享*/
          style:'201',
          width:32,
          height:32
        };
        var s = [];
        for(var i in p){
          s.push(i + '=' + encodeURIComponent(p[i]||''));
        }
        window.open(['http://connect.qq.com/widget/shareqq/index.html?',s.join('&')].join(''),'分享','top=100,left=100,width=800,height=600')
      },
      
      showMusic() {
        this.$store.commit('setPlayer',true)
      }
    },
    
    watch: {
      'detail.isCollect'() {
        this.showMenu.find(m => m.name == '收藏').icon = this.detail.isCollect ? 'icon-shoucang1' : 'icon-shoucang'
      }
    }
  }
</script>

<style lang="scss" scoped>
ul {
  position: fixed;
  right: 40px;
  bottom: 110px;
  border: 1px solid #dcdcdc;
  background-color: #fff;
  z-index: 1000;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-top: 1px solid #dcdcdc;
    cursor: pointer;
    i {
      font-size: 20px;
    }
    
    .music-icon {
      width: 30px;
      height: 30px;
      cursor: pointer;
      animation: rotate 5s linear infinite;
    }
  }
  li:first-child {
    border: none;
  }
  li:hover {
    background-color: darkgrey;
  }
  .icon-shoucang1 {
    color: #ea6f5a;
  }
}
</style>