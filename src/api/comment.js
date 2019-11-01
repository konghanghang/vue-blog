import fetch from './fetch';

export default {
  //新建评论
  new(data) {
    return fetch.post('/article/comment', data)
  },
  
  //评论列表
  list(data) {
    return fetch.get(`/article/comment/${data.articleId}?pageNo=${data.page || 1}`)
  }
}