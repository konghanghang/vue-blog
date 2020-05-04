import fetch from './fetch';

export default {
  //获取上传token
  getUploadToken() {
    return fetch.get('/qiniu/upload/token')
  },
  qiniuUpload(data) {
    return fetch.postForm('http://upload-z2.qiniup.com', data);
    //return fetch.postForm('/utils/image/uploadFile', data);
  },
}