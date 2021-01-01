
import { get, post, put, _delete } from './apiWrapper'

export default {

	all: get('/all'),
	me: get('/me'),

	search: post('/search'),
	teamCode: get('/teamCode'),

	create: post('/create'),
	leave: _delete('/leave'),

	join: put('/join'),
	tooglePrivate: put('/tooglePrivate'),
	edit: put('/edit')

}
