import fetch from './fetch';

export default {
	// 查看所有
	queryJob(page) {
		return fetch.get('/job/queryJob?pageNo='+page+'&pageSize='+20)
	},
	addJob(data){
		return fetch.post("/job/addJob", data);
	},
	updateJob(data){
		return fetch.post("/job/updateJob", data);
	},
	pauseJob(data){
		return fetch.post("/job/pauseJob", data);
	},
	resumeJob(data){
		return fetch.post("/job/resumeJob", data);
	},
	deleteJob(data){
		return fetch.post("/job/deleteJob", data);
	},
	doJob(data){
		return fetch.post("/job/doJob", data);
	}
}