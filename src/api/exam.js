import fetch from './fetch';

export default {

	addExam(data) {
		return fetch.postJson('/exam/info/add', data)
	},
	list(data) {
		return fetch.postJson('/exam/info/list', data)
	},
	getById(id) {
		return fetch.get('/exam/info/' + id)
	}
}