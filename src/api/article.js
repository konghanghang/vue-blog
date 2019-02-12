import fetch from './fetch';

export default {

	// 发布新文章
	add(data) {
		return fetch.post('/article',data)
	},
	
	// 文章编辑
	edit(data) {
		return fetch.patch('/article',data)
	},
	
	//详情
	detail(id) {
		return fetch.get('/article/'+id)
	},
	
	//文章列表
	list(page) {
		return fetch.get('/article?pageNo='+page)
	},

	//文章精选列表
	careChosenList() {
		return fetch.get('/article/chosen')
	},
	
	//我的文章
	self(page,username) {
		let user = JSON.parse(window.localStorage.getItem('jianbaba-userInfo'));
		return fetch.get('/article?username=' + user.username + '&pageNo=' + page)
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