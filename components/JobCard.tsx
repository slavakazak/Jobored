import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Job } from './Interfaces/Jobs'
import { AddressIcon } from './icons/AddressIcon'

interface JobCard {
	job: Job
	single?: boolean
}

export function JobCard({ job, single = false }: JobCard) {
	const [favorite, setFavorite] = useState(false)

	let salary = ''
	if (job.payment_from !== 0 && job.payment_to !== 0) {
		salary = 'з/п ' + job.payment_from + ' - ' + job.payment_to + ' ' + job.currency
	} else if (job.payment_from !== 0 && job.payment_to === 0) {
		salary = 'з/п от ' + job.payment_from + ' ' + job.currency
	} else if (job.payment_from === 0 && job.payment_to !== 0) {
		salary = 'з/п ' + job.payment_to + ' ' + job.currency
	}

	useEffect(() => {
		setFavorite(JSON.parse(localStorage.getItem('favorites') || '[]').includes(job.id))
	}, [])

	function favoriteClickHandler() {
		let favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
		let isFavorite = favorites.includes(job.id)
		if (isFavorite) {
			favorites = favorites.filter((item: number) => item !== job.id)
		} else {
			favorites.push(job.id)
		}
		localStorage.setItem('favorites', JSON.stringify(favorites))
		setFavorite(!isFavorite)
	}

	return (
		<div className={'job-card' + (single ? ' single' : '')} data-elem={'vacancy-' + job.id}>
			<div className='job-card-head'>
				{single ? (
					<h2>{job.profession}</h2>
				) : (
					<Link href='/vacancy/[id]' as={`/vacancy/${job.id}`}>
						<h2>{job.profession}</h2>
					</Link>
				)}
				<svg
					viewBox='0 0 24 24'
					fill='none'
					className={'favorite' + (favorite ? ' active' : '')}
					onClick={favoriteClickHandler}
					data-elem={`vacancy-${job.id}-shortlist-button`}>
					<path
						d='M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z'
						strokeWidth='1.5'
					/>
				</svg>
			</div>
			{(salary || job.type_of_work) && (
				<div className='job-card-info'>
					{salary && <div className='salary'>{salary}</div>}
					{salary && job.type_of_work && <div className='dot'>•</div>}
					{job.type_of_work && <div className='schedule'>{job.type_of_work.title}</div>}
				</div>
			)}
			{job.town && (
				<div className='job-card-address'>
					<AddressIcon />
					<span>{job.town.title}</span>
				</div>
			)}
		</div>
	)
}
