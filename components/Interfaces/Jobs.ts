export interface Job {
	job: string
	salary?: string
	schedule?: string
	address?: string
	isFavorite?: boolean
}

export type Jobs = Job[] | null
