import { useFilters } from './FiltersContext'
import { Dropdown } from './Dropdown'
import { Range } from './Range'
import { Option } from './Dropdown'

const industriesArray = [
	'IT, интернет, связь, телеком',
	'Кадры, управление персоналом',
	'Искусство, культура, развлечения',
	'Банки, инвестиции, лизинг',
	'Дизайн',
]

const industries: Option[] = industriesArray.map((industry, i) => ({
	text: industry,
	id: i,
}))

export function Filters() {
	const filters = useFilters()

	function resetClickHandler() {
		filters.setIndustry('')
		filters.setIndustryId(null)
		filters.setSalaryFrom('')
		filters.setSalaryTo('')
	}

	return (
		<div className='filters'>
			<div className='filters-head'>
				<h2>Фильтры</h2>
				<div className='reset' onClick={resetClickHandler}>
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
				options={industries}
				value={filters.industry}
				setValue={filters.setIndustry}
				currentOption={filters.industryId}
				setCurrentOption={filters.setIndustryId}
			/>
			<Range
				name='salary'
				title='Оклад'
				placeholderFrom='От'
				placeholderTo='До'
				step={1000}
				from={filters.salaryFrom}
				setFrom={filters.setSalaryFrom}
				to={filters.salaryTo}
				setTo={filters.setSalaryTo}
			/>
			<button className='apply'>Применить</button>
		</div>
	)
}
