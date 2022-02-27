import fetch from './fetch';

export default {

	// 登录
	login(data) {
		
		let	params = {
			username:data.username,
			password:data.password
		}
		return fetch.postJson('/passport/login', params)
	},
	
	//注册
	register(data) {
		let params = {
			"accountVO": data
		}
		return fetch.postJson('/account/register', params)
	},
	
	//获取用户信息
	info() {
		return fetch.get('/account/info')
	}
}