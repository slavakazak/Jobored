import { ParsedUrlQuery } from 'querystring'

export function searchParams(query: ParsedUrlQuery) {
	if (!Object.keys(query).length) return ''
	let queryString = ''
	for (let key in query) {
		queryString += `${key}=${query[key]}&`
	}
	const searchParams = new URLSearchParams(queryString)
	return '?' + searchParams.toString()
}
