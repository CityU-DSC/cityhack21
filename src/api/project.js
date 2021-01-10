
import axiosAPI from './apiWrapper'

const { get, post, put } = axiosAPI

export default {
	all: get('/project/all'),
	me: get('/project/me'),

	create: post('/project/create'),
	toogleVote: put('/project/toogleVote'),

	edit: put('/team/edit')
}
