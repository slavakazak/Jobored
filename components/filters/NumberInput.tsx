import { useState } from 'react'
import { SmallArrow } from '../icons/SmallArrow'

interface NumberInput {
	name: string
	placeholder?: string
	step?: number
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

export function NumberInput({ name, placeholder = '', step = 1, value, setValue }: NumberInput) {
	function increment(step: number) {
		return () =>
			setValue(previous => {
				return +previous + step < 0 ? '0' : (+previous + step).toString()
			})
	}

	return (
		<div className='input-wrapper'>
			<input
				type='number'
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={e => setValue(e.target.value)}
			/>
			<SmallArrow className='arrow-top' onClick={increment(step)} />
			<SmallArrow className='arrow-bottom' onClick={increment(-step)} />
		</div>
	)
}
