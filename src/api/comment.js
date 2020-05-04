import fetch from './fetch';

export default {
  //新建评论
  new(data) {
    let params = {
      commentVO: data
    }
    return fetch.postJson('/article/comment', params)
  },
  
  //评论列表
  list(data) {
    let params = {
      sortType: "desc",
      levelId: 0,
      pageModel: {
        pageSize: 10,
        pageNum: data.page
      }
    }
    return fetch.postJson(`/article/comment/${data.articleId}`, params)
  },

  //我的回复
  myReplay(data) {
    let params = {
      pageModel: {
        pageSize: 10,
        pageNum: data
      }
    }
    return fetch.postJson('/article/comment/replayTo', params)
  },

  //回复我的
  received(data) {
    let params = {
      pageModel: {
        pageSize: 10,
        pageNum: data
      }
    }
    return fetch.postJson('/article/comment/received', params)
  }
}