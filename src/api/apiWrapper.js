import axios from './api';

export default {
	get(path){
		return () => axios.get(path)
	},
	post(path){
		return params => axios.post(path, params)
	} ,
	put(path){
		return params => axios.put(path, params)
	},
	_delete(path){
		return () => axios.delete(path)
	}
}

