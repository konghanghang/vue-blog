import fetch from './fetch';

export default {
	// 查看所有
	queryJob(page) {
		return fetch.get('/job/queryJob?pageNo='+page+'&pageSize='+20)
	},
	addJob(data){
		let params = {
			jobVo: data
		}
		return fetch.postJson("/job/addJob", params);
	},
	updateJob(data){
		let params = {
			jobVo: data
		}
		return fetch.putJson("/job/updateJob", params);
	},
	pauseJob(data){
		let params = {
			"className": data
		};
		return fetch.post("/job/pauseJob", params);
	},
	resumeJob(data){
		let params = {
			"className": data
		};
		return fetch.post("/job/resumeJob", params);
	},
	deleteJob(data){
		return fetch.delete("/job/" + data);
	},
	doJob(data){
		return fetch.postJson("/job/doJob", data);
	}
}