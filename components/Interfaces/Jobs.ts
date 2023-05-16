export interface Vacancies {
	objects: Job[]
	total: number
	corrected_keyword: string
	more: boolean
}

export interface Job {
	id: number
	id_client: number
	payment_from: number
	payment_to: number
	date_pub_to: number
	date_archived: number
	date_published: number
	address?: string
	payment?: string
	profession: string
	work: string
	metro: Metro[]
	currency: string
	candidat?: string
	vacancyRichText?: string
	description?: string
	moveable: boolean
	agreement: boolean
	anonymous: boolean
	type_of_work: SimpleObject
	place_of_work: SimpleObject
	education: SimpleObject
	experience: SimpleObject
	maritalstatus: SimpleObject
	children: SimpleObject
	already_sent_on_vacancy: boolean
	languages: string[]
	driving_licence: string[]
	catalogues: Catalogue[]
	agency: SimpleObject
	town: Town
	client_logo: string
	age_from: number
	age_to: number
	gender: SimpleObject
	firm_name: string
	firm_activity: string
	link: string
}

interface SimpleObject {
	id: number
	title: string
}

interface Catalogue {
	id: number
	title: string
	positions: SimpleObject[]
}

interface Metro {
	id: number
	title: string
	id_metro_line: number
}

interface Town {
	id: number
	title: string
	declension: string
	genitive: string
}
