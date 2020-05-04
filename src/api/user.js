import fetch from './fetch';

export default {

	// 登录
	login(data) {
		
		let	params = {
			username:data.username,
			password:data.password
		}
		return fetch.postJson('/user/login', params)
	},
	
	//注册
	register(data) {
		let params = {
			"accountVO": data
		}
		return fetch.postJson('/user/register', params)
	},
	
	//获取用户信息
	info() {
		return fetch.get('/user/info')
	}
}