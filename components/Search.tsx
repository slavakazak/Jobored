import { useState } from 'react'
import { useRouter } from 'next/router'

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
				<svg viewBox='0 0 16 16' fill='none'>
					<path
						d='M11.468 11.468L14.5714 14.5714M13.0924 7.54622C13.0924 10.6093 10.6093 13.0924 7.54622 13.0924C4.48313 13.0924 2 10.6093 2 7.54622C2 4.48313 4.48313 2 7.54622 2C10.6093 2 13.0924 4.48313 13.0924 7.54622Z'
						strokeWidth='1.5'
						strokeLinecap='round'
					/>
				</svg>
			</label>
			<input
				type='search'
				id='search'
				name='search'
				value={keyword}
				onChange={e => setKeyword(e.target.value)}
				placeholder='Введите название вакансии'
			/>
			<button className='search-button' onClick={searchClickHandler}>
				Поиск
			</button>
		</div>
	)
}
