import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { SearchIcon } from './icons/SearchIcon'
import { useQuery } from './QueryContext'

export function Search() {
	const router = useRouter()
	const query = useQuery()

	useEffect(() => {
		query.setKeyword(router.query.keyword ? String(router.query.keyword) : '')
	}, [])

	return (
		<div className='search'>
			<label htmlFor='search'>
				<SearchIcon />
			</label>
			<input
				type='search'
				id='search'
				name='search'
				value={query.keyword}
				onChange={e => query.setKeyword(e.target.value)}
				placeholder='Введите название вакансии'
				data-elem='search-input'
			/>
			<button className='search-button' onClick={query.apply} data-elem='search-button'>
				Поиск
			</button>
		</div>
	)
}
