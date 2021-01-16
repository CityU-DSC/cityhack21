
import axiosAPI from './apiWrapper'

const { get, post, put } = axiosAPI

export default {
	all: get('/project/all'),
	me: get('/project/me'),

	create: post('/project/create'),
	toggleVote: put('/project/toggleVote'),

	edit: put('/project/edit'),

	setStatus: put('/project/status')
}
