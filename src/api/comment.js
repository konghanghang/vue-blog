import fetch from './fetch';

export default {
  //新建评论
  new(data) {
    
    let params = {
      content:data.content,
      articleId:data.articleId,
      replayId:data.replayId || 0,
    }
    if(data.ReplayTo) {
      params.ReplayTo = data.ReplayTo
    }
    return fetch.post('/article/comment', params)
  },
  
  //评论列表
  list(data) {
    return fetch.get(`/article/comment/${data.articleId}?pageNo=${data.page || 1}`)
  }
}