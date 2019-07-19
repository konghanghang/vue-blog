//import axios from 'axios'
const axios = window.axios


let util = {

};

const ajaxUrl = process.env.VUE_APP_API_ROOT;

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.api = ajaxUrl;

util.getImage = url => {
	if(url) {
		return process.env.VUE_APP_IMAGE_URL + url
	} else {
		return ''
	}
}

export default util;