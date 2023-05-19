import { useEffect } from 'react'
import { Dropdown } from './Dropdown'
import { Range } from './Range'
import { Catalog } from '../Interfaces/Catalog'
import { useRouter } from 'next/router'
import { useQuery } from '../QueryContext'

export function Filters({ catalogues }: { catalogues: Catalog[] | null }) {
	const router = useRouter()
	const query = useQuery()

	useEffect(() => {
		const key = router.query.catalogues ? +router.query.catalogues : null
		query.setCataloguesKey(key)
		query.setIndustry((catalogues && catalogues.find(catalog => catalog.key === key)?.title) || '')
		query.setPaymentFrom(router.query.payment_from ? String(router.query.payment_from) : '')
		query.setPaymentTo(router.query.payment_to ? String(router.query.payment_to) : '')
	}, [])

	return (
		<div className='filters'>
			<div className='filters-head'>
				<h2>Фильтры</h2>
				<div className='reset' onClick={query.reset}>
					<span>Сбросить все</span>
					<svg viewBox='0 0 16 16' fill='none'>
						<line x1='11.7425' y1='4.44219' x2='4.44197' y2='11.7427' strokeWidth='1.25' />
						<line x1='11.9013' y1='11.7425' x2='4.60082' y2='4.44197' strokeWidth='1.25' />
					</svg>
				</div>
			</div>
			<Dropdown
				name='industry'
				title='Отрасль'
				placeholder='Выберете отрасль'
				options={
					catalogues &&
					catalogues.map(catalog => ({
						title: catalog.title,
						key: catalog.key,
					}))
				}
				value={query.industry}
				setValue={query.setIndustry}
				currentOption={query.cataloguesKey}
				setCurrentOption={query.setCataloguesKey}
				dataElem='industry-select'
			/>
			<Range
				name='salary'
				title='Оклад'
				placeholderFrom='От'
				placeholderTo='До'
				step={1000}
				from={query.paymentFrom}
				setFrom={query.setPaymentFrom}
				to={query.paymentTo}
				setTo={query.setPaymentTo}
				dataElemFrom='salary-from-input'
				dataElemTo='salary-to-input'
			/>
			<button className='apply' onClick={query.apply} data-elem='search-button'>
				Применить
			</button>
		</div>
	)
}
