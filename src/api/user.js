import fetch from './fetch';

export default {

	// 登录
	login(data) {
		
		let	params = {
			username:data.username,
			password:data.password
		}
		return fetch.post('/user/login', params)
	},
	
	//注册
	register(data) {
		return fetch.post('/user/register',data)
	},
	
	//获取用户信息
	info() {
		return fetch.get('/user/info')
	}
}