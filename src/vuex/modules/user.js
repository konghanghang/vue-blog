import user from '../../api/user'

const state = {
  info: {}
}

const mutations = {

  setUserInfo(state, data) {
    state.info = data;
  }

}

const actions = {

  // 获取当前登录用户信息
  getUserInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      let userInfo = JSON.parse(window.localStorage.getItem('jianbaba-userInfo'))
      if(userInfo) {
        commit('setUserInfo', userInfo)
        resolve(userInfo)
      } else {
        user.info().then(ret => {
          console.log('信息', ret)
          window.localStorage.setItem('jianbaba-userInfo', JSON.stringify(ret.data.data))
          commit('setUserInfo', ret.data.data)
          resolve(ret.data.data)
        }).catch(ret => {
          reject(ret)
        })
      }

    })

  }

}

export default {
  state,
  actions,
  mutations
}