import { ParsedUrlQuery } from 'querystring'
import { Vacancies } from '@/components/Interfaces/Jobs'
import { Catalog } from '@/components/Interfaces/Catalog'

interface JSON {
	[key: string]: string
}

export interface FetchParams {
	headers: JSON
}

export async function getFetchParams() {
	const base = 'https://startup-summer-2023-proxy.onrender.com'
	const xSecretKey = 'GEU4nvd3rej*jeh.eqp'

	const passwordPath = '/2.0/oauth2/password'
	const passwordUrl = new URL(passwordPath, base)
	const passwordSearchParams: { [key: string]: string } = {
		login: 'sergei.stralenia@gmail.com',
		password: 'paralect123',
		client_id: '2356',
		client_secret: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
		hr: '0',
	}
	for (let key in passwordSearchParams) {
		passwordUrl.searchParams.set(key, passwordSearchParams[key])
	}
	const passwordResponse = await fetch(passwordUrl, { headers: { 'x-secret-key': xSecretKey } })
	const passwordJSON = await passwordResponse.json()
	const AccessToken = passwordJSON.access_token

	return {
		headers: {
			'x-secret-key': xSecretKey,
			'X-Api-App-Id': passwordSearchParams.client_secret,
			Authorization: 'Bearer ' + AccessToken,
		},
	}
}

export async function getJSON(path: string, searchParams: JSON, fetchParams: FetchParams) {
	const base = 'https://startup-summer-2023-proxy.onrender.com'
	const url = new URL(path, base)
	for (let key in searchParams) {
		url.searchParams.set(key, searchParams[key])
	}
	const response = await fetch(url, fetchParams)
	return await response.json()
}

export async function getMainPageProps(query: ParsedUrlQuery) {
	const fetchParams: FetchParams = await getFetchParams()
	const vacanciesSearchParams: { [key: string]: string } = {
		count: '4',
	}
	for (let key in query) {
		if (key === 'page') vacanciesSearchParams.page = String(query.page && +query.page - 1)
		else vacanciesSearchParams[key] = String(query[key])
	}
	const vacanciesJSON: Vacancies = await getJSON('/2.0/vacancies/', vacanciesSearchParams, fetchParams)
	const cataloguesJSON: Catalog[] = await getJSON('/2.0/catalogues/', {}, fetchParams)
	return { vacanciesJSON, cataloguesJSON }
}
