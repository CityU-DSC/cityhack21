import axios from './api';

module.exports = {
	get: path => () => axios.get(path),
	post: path => params => axios.post(path, params),
	put: path => params => axios.put(path, params),
	_delete: path => () => axios.delete(path),
}

