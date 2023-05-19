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
	const base = process.env.NEXT_PUBLIC_BASE
	const xSecretKey = process.env.NEXT_PUBLIC_X_SECRET_KEY || ''

	const passwordPath = '/2.0/oauth2/password'
	const passwordUrl = new URL(passwordPath, base)
	const passwordSearchParams: { [key: string]: string } = {
		login: process.env.NEXT_PUBLIC_LOGIN || '',
		password: process.env.NEXT_PUBLIC_PASSWORD || '',
		client_id: process.env.NEXT_PUBLIC_CLIENT_ID || '',
		client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
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
	const base = process.env.NEXT_PUBLIC_BASE
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
