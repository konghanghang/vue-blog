import fetch from './fetch';

export default {

	// 查看所有
	show(page) {
		return fetch.get('/menses?pageNo='+page)
	},
	//收藏
	collect(id) {
	  let data = {
	    articleId:id
	  }
	  return fetch.post('/article/collect',data)
	}
}