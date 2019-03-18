import fetch from './fetch';

export default {

	// 查看所有
	show(page) {
		return fetch.get('/menses?pageNo='+page)
	}
}