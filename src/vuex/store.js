import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
import article from './modules/article'
import loadMore from './modules/loadMore'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {  
  	
    //加载进度条状态
    loading:0,
    
    dot:false,
    
    //表单提交等待状态
    submitting:false,
    
    musicPlayer:false
    
  },

  mutations: {
    //加载进度条状态
    updateLoad(state,status) {
    	
    	if(status) {
    		state.loading = 1
    	} else {
    		state.loading = 2
    	}
    	
    },
    
    updateDot(state,status) {
    	
    	if(status) {
    		state.dot = true
    	} else {
    		setTimeout(() => {
					state.dot = false
				},300)
    	}
    },
    
    setSubmit(state,status) {
    	
    	state.submitting = status
    },
    
    setPlayer(state,status) {
      state.musicPlayer = status
    }
  },
  
  actions: {
  },
  
  modules: {
    user,
    article,
    loadMore
  }

});

export default store;
