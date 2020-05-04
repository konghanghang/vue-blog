import article from '../../api/article'

const state = {
  list: [],
  page:{
    pageNum:1,
    pageSize:1,
    pages:1,
    size:1,
    total:1
  },
  
  detail: {
    author: null,
    createDate: null,
    title: null,
    tag: null,
    content: null,
    refArticleId: null,
    isCollect:false
  }
}

const mutations = {

  setArticleList(state, data) {
    if(data.pageModel.pageNum == 1) {
      state.list = data.list
    } else {
      state.list = state.list.concat(data.list)
    }
    console.log('列表',state.list)
    state.page = data.pageModel
  },
  
  setArticleDetail(state, data) {
    state.detail = data
  }

}

const actions = {

  //获取文章列表
  getArticleList({
    commit
  }, page = 1) {
    return new Promise((resolve, reject) => {

      article.list(page).then(ret => {
        console.log(456,ret)
        commit('setArticleList',ret.data)
        resolve(ret);
      }).catch(err => {
        reject(err);
      });

    })
  },
  
  getArticleDetail({
    commit,
    rootState
  }) {
    return new Promise((resolve, reject) => {

      article.detail(rootState.route.params.id).then(ret => {
        commit("setArticleDetail", ret.data);
        console.log('详情',ret.data)
        resolve(ret);
      }).catch(err => {
        reject(err);
      });

    })
  }

}

export default {
  state,
  actions,
  mutations
}