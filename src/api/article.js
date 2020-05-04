import fetch from './fetch';

export default {

	// 发布新文章
	add(data) {
		let params = {
			"articleVO": data
		}
		return fetch.postJson('/article',params)
	},
	
	// 文章编辑
	edit(data) {
		let params = {
			articleVO: data
		}
		return fetch.putJson('/article', params)
	},
	
	//详情
	detail(id) {
		return fetch.get('/article/'+id)
	},
	
	//文章列表
	list(page) {
		let params = {
			username: null,
			pageModel: {
				pageSize: 10,
				pageNum: page
			}
		}
		return fetch.postJson('/article/list', params)
	},

	//文章精选列表
	careChosenList() {
		return fetch.get('/article/chosen')
	},
	
	//我的文章
	self(page) {
		let user = JSON.parse(window.localStorage.getItem('jianbaba-userInfo'));
		let params = {
			username: user.username,
			pageModel: {
				pageSize: 10, 
				pageNum: page
			}
		}
		return fetch.postJson('/article/list', params)
	},
	
	//删除文章
	delete(id) {
		return fetch.delete('/article/' + id)
	},
	
	//文章收藏和评论点赞
	collect(data) {
	  return fetch.post('/collect',data)
	}
}