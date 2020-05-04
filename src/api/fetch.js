import Util from '../libs/util'
import qs from 'qs'
Util.ajax.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}

Util.ajax.interceptors.request.use(config => {
 	config.headers.common['Authorization'] = window.localStorage.getItem('jianbaba-token') || ''
  return config

}, error => {
  return Promise.reject(error)

})

Util.ajax.interceptors.response.use(response => {
  return response.data
}, error => {

  let response = error.response
  
  if (response.status == 401) {
    if(response.data.status == 1009 || response.data.status == 701 || response.data.status == 700) {
    	window.localStorage.removeItem('jianbaba-token')
    	//跳转到登录页
    	window.location.href = '/login?target_url=' + encodeURIComponent(document.URL)
    }
  }
  
  return Promise.reject(response.data)

})

export default {
  post(url, data) {
    return Util.ajax({
        method: 'post',
        url: url,
        data: qs.stringify(data),
        timeout: 30000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    })
  },

  postForm(url, data) {
    return Util.ajax({
        method: 'post',
        url: url,
        data: data,
        timeout: 30000,
        headers: {
          'Content-Type': 'multipart/form-data; charset=UTF-8'
        }
    })
  },

  postJson(url, data) {
    return Util.ajax({
        method: 'post',
        url: url,
        data: JSON.stringify(data),
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
    })
  },

  get(url, params) {
    return Util.ajax({
      method: 'get',
      url: url,
      params
    })
  },
  
  delete(url, params) {
    return Util.ajax({
      method: 'delete',
      url: url,
      params
    })
  },
  
  put(url, data) {
    return Util.ajax({
      method: 'put',
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
  },

  putJson(url, data) {
    return Util.ajax({
      method: 'put',
      url: url,
      data: JSON.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  },

  patch(url, data) {
    return Util.ajax({
      method: 'patch',
      url: url,
      data: JSON.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
  }
}