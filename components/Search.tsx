import { useState } from 'react'
import { useRouter } from 'next/router'
import { SearchIcon } from './icons/SearchIcon'

export function Search() {
	const router = useRouter()
	const [keyword, setKeyword] = useState(router.query.keyword || '')

	function searchClickHandler() {
		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				keyword: keyword,
			},
		})
	}

	return (
		<div className='search'>
			<label htmlFor='search'>
				<SearchIcon />
			</label>
			<input
				type='search'
				id='search'
				name='search'
				value={keyword}
				onChange={e => setKeyword(e.target.value)}
				placeholder='Введите название вакансии'
				data-elem='search-input'
			/>
			<button className='search-button' onClick={searchClickHandler} data-elem='search-button'>
				Поиск
			</button>
		</div>
	)
}
