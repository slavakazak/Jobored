import { NumberInput } from './NumberInput'

interface Range {
	name: string
	title?: string
	placeholderFrom?: string
	placeholderTo?: string
	step?: number
	from: string
	setFrom: React.Dispatch<React.SetStateAction<string>>
	to: string
	setTo: React.Dispatch<React.SetStateAction<string>>
	dataElemFrom?: string
	dataElemTo?: string
}

export function Range({
	name,
	title,
	placeholderFrom = '',
	placeholderTo = '',
	step = 1,
	from,
	setFrom,
	to,
	setTo,
	dataElemFrom,
	dataElemTo,
}: Range) {
	return (
		<div className='input-group'>
			{title && <label htmlFor={name + '-from'}>{title}</label>}
			<NumberInput
				name={name + '-from'}
				placeholder={placeholderFrom}
				step={step}
				value={from}
				setValue={setFrom}
				dataElem={dataElemFrom}
			/>
			<NumberInput
				name={name + '-to'}
				placeholder={placeholderTo}
				step={step}
				value={to}
				setValue={setTo}
				dataElem={dataElemTo}
			/>
		</div>
	)
}
