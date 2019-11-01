<template>
	<el-row>
		<el-col :span="24" class="padding-all-lg">

			<el-form ref="form" :model="form" label-width="80px">

				<el-form-item label="文章标题">
					<el-input size="medium" v-model="form.title"></el-input>
				</el-form-item>

				<el-form-item label="类型">
					<el-select size="medium" v-model="form.classification" placeholder="请选择类型">
						<el-option label="社会热点" value="社会热点"></el-option>
						<el-option label="学术研究" value="学术研究"></el-option>
						<el-option label="心灵鸡汤" value="心灵鸡汤"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="封面图">
					<upload :defaultUrl="getImage(defaultUrl)" @success="upload"></upload>
				</el-form-item>

				<el-form-item label="内容">
          <mavon-editor v-model="form.mdContent" ref=md :codeStyle="codeStyle" @imgAdd="$imgAdd" :toolbars="toolbars"/>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit" :disabled="submitting" :loading="submitting">提交</el-button>
				</el-form-item>
			</el-form>

		</el-col>
	</el-row>

</template>

<script>
import util from "../../libs/util";
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import article from "../../api/article";
import common from '../../api/common';
import upload from "../../components/upload";

export default {
  components: {
    mavonEditor,
    upload
  },
  data() {
    return {
      form: {
        title: "",
        classification: "",
        content: "",
        coverImage: ""
      },
      defaultUrl:'',
      description: null,
      codeStyle: 'androidstudio',
      toolbars:{
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      }
    };
  },

  computed: {
    submitting() {
      return this.$store.state.submitting;
    },
    contentCode() {
      return this.$refs.md.d_render;
    }
  },

  created() {
    if (this.$route.meta.edit) {
      this.getDetail();
    }
  },

  methods: {
    onSubmit() {
      this.$store.commit("setSubmit", true);
      
      this.description = this.$refs.md.d_render;
      //去除HTML tag
      this.description = this.description.replace(/<\/?[^>]*>/g, "");

      //去除多余空行
      this.description = this.description.replace(/\n[\s| | ]*\r/g, "\n");

      if (this.description.length > 120) {
        this.description = this.description.substring(0, 120) + "...";
      }
			
			
      if (this.$route.meta.edit) {
        this.editArticle();
      } else {
        this.newArticle();
      }
     	
    },
    
    newArticle() {
      let data = {
        title: this.form.title,
        classification: this.form.classification,
        content: this.$refs.md.d_render,
        description: this.description,
        coverImage: this.form.coverImage,
        mdContent:this.form.mdContent
      };
      console.log(data);
      article.add(data).then(ret => {
          console.log(ret);
          this.$store.commit("setSubmit", false);
          this.$message({
            message: "添加成功",
            type: "success"
          });

          this.$router.push({
            name: "detail",
            params: {
              id: ret.data.data.id
            }
          });
        }).catch(err => {
          this.$store.commit("setSubmit", false);
          console.log(err);
          this.$message.error(err.data.message);
        });
    },

    editArticle() {
      let data = {
        title: this.form.title,
        classification: this.form.classification,
        content: this.$refs.md.d_render,
        mdContent: this.form.mdContent,
        description: this.description,
        coverImage: this.form.coverImage,
        id: this.$route.params.articleId
      };

      article.edit(data).then(ret => {
          console.log(ret);

          this.$store.commit("setSubmit", false);

          this.$message({
            message: "编辑成功",
            type: "success"
          });

          this.$router.push({
            name: "detail",
            params: {
              id: ret.data.data
            }
          });
        })
        .catch(err => {
          this.$store.commit("setSubmit", false);
          console.log(err);
          this.$message.error(err.data.message);
        });
    },


    getDetail() {
    	this.$store.commit("updateLoad", true);
      article.detail(this.$route.params.articleId).then(ret => {
          console.log(123, ret);
          this.form = ret.data.data;
					this.defaultUrl = ret.data.data.coverImage
          this.$store.commit("updateLoad", false);
        })
        .catch(err => {
          this.$message.error(err.data.message);
          this.$store.commit("updateLoad", false);
        });
    },
    
    getImage(url) {
  		return util.getImage(url)
  	},
  	
  	upload(url) {
      console.log(url);
  		this.form.coverImage = url
  	},

    // 绑定@imgAdd event
    $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('file', $file);
        formdata.append('token', JSON.parse(localStorage.getItem('qiniuToken')).token);
        common.qiniuUpload(formdata).then(ret => {
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          // $vm.$img2Url 详情见本页末尾
          console.log(ret);
          let imageUrl = util.getImage(ret.data.key);
          this.$refs.md.$img2Url(pos, imageUrl);
        }).catch(err => {
          this.$store.commit("setSubmit", false);
          console.log(err);
          this.$message.error(err.data.message);
        });
    }
  },
  
  watch:{
  	$route() {
  		if(this.$route.name == 'newArticle') {
  			this.form = {
	        title: "",
	        classification: "",
	        content: "",
	        coverImage: ""
	     	}
  			this.defaultUrl = ''
  		}
  		if (this.$route.meta.edit) {
	      this.getDetail();
	    }
  	}
  }
};
</script>

<style scoped lang="scss">

</style>
