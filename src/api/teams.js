
import axiosAPI from './apiWrapper'

const { get, post, put, _delete } = axiosAPI

export default {

	// all: get('/team/all'),
	me: get('/team/me'),

	search: post('/team/search'),
	// teamCode: get('/team/teamCode'),

	create: post('/team/create'),
	leave: _delete('/team/leave'),

	join: put('/team/join'),
	// tooglePrivate: put('/team/tooglePrivate'),
	edit: put('/team/edit'),
	kickMember: put('/team/kickMember')

}
