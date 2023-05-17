import { useState } from 'react'
import { Dropdown } from './Dropdown'
import { Range } from './Range'
import { Catalog } from '../Interfaces/Catalog'
import { useRouter } from 'next/router'

export function Filters({ catalogues }: { catalogues: Catalog[] }) {
	const router = useRouter()

	const [cataloguesKey, setCataloguesKey] = useState<number | null>(
		router.query.catalogues ? +router.query.catalogues : null
	)
	const [industry, setIndustry] = useState(catalogues.find(catalog => catalog.key === cataloguesKey)?.title || '')
	const [paymentFrom, setPaymentFrom] = useState(router.query.payment_to ? String(router.query.payment_from) : '')
	const [paymentTo, setPaymentTo] = useState(router.query.payment_to ? String(router.query.payment_to) : '')

	function reset() {
		setIndustry('')
		setCataloguesKey(null)
		setPaymentFrom('')
		setPaymentTo('')
	}

	function applyClickHandler() {
		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				payment_from: paymentFrom,
				payment_to: paymentTo,
				catalogues: cataloguesKey,
			},
		})
	}

	return (
		<div className='filters'>
			<div className='filters-head'>
				<h2>Фильтры</h2>
				<div className='reset' onClick={reset}>
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
				value={industry}
				setValue={setIndustry}
				currentOption={cataloguesKey}
				setCurrentOption={setCataloguesKey}
			/>
			<Range
				name='salary'
				title='Оклад'
				placeholderFrom='От'
				placeholderTo='До'
				step={1000}
				from={paymentFrom}
				setFrom={setPaymentFrom}
				to={paymentTo}
				setTo={setPaymentTo}
			/>
			<button className='apply' onClick={applyClickHandler}>
				Применить
			</button>
		</div>
	)
}
