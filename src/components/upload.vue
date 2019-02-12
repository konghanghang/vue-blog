<template>
	<el-upload 
		class="avatar-uploader" 
		:action="action" 
		:show-file-list="false" 
		:data="uploadData" 
		:on-success="handleAvatarSuccess" 
		:before-upload="beforeAvatarUpload"
		:on-error="error"
		>
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			<div class="loading" v-loading="loading" element-loading-spinner="el-icon-loading">
			</div>
	</el-upload>
</template>

<script>
import util from '../libs/util'
import common from '../api/common'
export default {
  props:['defaultUrl'],
  data() {
    return {
      loading:false,
      uploadData: {},
      imageUrl:'',
      /*action:util.api + '/utils/image/upload'*/
      action:'http://up-z2.qiniu.com',
      token:''
    };
  },
  
  computed: {
  	
  },

  created() {
    let json = JSON.parse(localStorage.getItem('qiniuToken'));
    console.log("json",json);
    let nowTimestamp=new Date().getTime()/1000;
    if(json != null){
      let {deadLine, token} = json;
      if(deadLine <= nowTimestamp){
        this.getToken();
      }else{
        this.token = token;
      }
    }else{
      this.getToken();
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      this.loading = false
      this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit('success',res.key);
      console.log('成功',res)
    },
    beforeAvatarUpload(file) {
    	this.loading = true
      let _this = this;
      return new Promise(function(resolve, reject) {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file);
        oFReader.onload = function(oFREvent) {
          _this.uploadData = {
            image: oFReader.result,
            token: _this.token
          };
          resolve();
        };
      });

      /*const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      this.image.image = file

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;*/
    },
    
    error() {
    	this.loading = false
    },
    getToken() {
      common.getUploadToken().then(ret => {
          console.log(ret);
          let data = ret.data.data;
          this.token = JSON.parse(data).token;
          localStorage.setItem('qiniuToken', data);
        }).catch(err => {
          console.log(err);
        });
    }
  },
  
  watch: {
  	'defaultUrl'() {
  		this.imageUrl = this.defaultUrl
  	}
  }
};
</script>

<style scoped lang="scss">
  .pagination {
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .loading {
    position: absolute !important;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>