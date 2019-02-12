import { Message } from 'element-ui';

const state = {
  more: false
}

const mutations = {
  setMore(state, status) {
    state.more = status;
  }

}

const actions = {
  //加载更多
  loadMore({
    commit
  }, loadData) {
    commit('setMore',true)
    return new Promise((resolve, reject) => {
      if(loadData.page.pageNum && loadData.page.pageNum === loadData.page.pages) {
        Message.success('这已经是最后一页了')
        commit('setMore',true)
        resolve()
      } else {
        loadData.page.pageNum++;
        loadData.fetchData(loadData.page.pageNum).then(ret => {
          commit('setMore',false)
        })
        resolve()
      }
      
    })
  }

}

export default {
  state,
  actions,
  mutations
}