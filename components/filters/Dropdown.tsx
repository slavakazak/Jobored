import { useState, useRef } from 'react'
import { DropdownArrow } from '../icons/DropdownArrow'

export interface Option {
	title: string
	key: number
}

interface Dropdown {
	name: string
	title?: string
	placeholder?: string
	options?: Option[]
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	currentOption: number | null
	setCurrentOption: React.Dispatch<React.SetStateAction<number | null>>
}

export function Dropdown({
	name,
	title,
	placeholder = '',
	options,
	value,
	setValue,
	currentOption,
	setCurrentOption,
}: Dropdown) {
	const [dropdown, setDropdown] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const [optionsState, setOptionsState] = useState(options)

	function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const text = e.target.value
		setValue(text)
		setCurrentOption(null)
		const filteredOptions =
			options && options.filter(option => option.title.trim().toLowerCase().includes(text.trim().toLowerCase()))
		setOptionsState(filteredOptions)
	}

	function SVGMouseHandler(e: React.MouseEvent<SVGSVGElement>) {
		e.preventDefault()
		if (inputRef && inputRef.current) {
			if (dropdown) {
				inputRef.current.blur()
			} else {
				inputRef.current.focus()
			}
		}
	}

	function dropdownMouseHandler(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault()
		if (inputRef && inputRef.current) {
			inputRef.current.focus()
		}
	}

	function optionClickHandler(option: Option) {
		return () => {
			if (inputRef && inputRef.current) {
				inputRef.current.blur()
			}
			setCurrentOption(option.key)
			setValue(option.title)
			setTimeout(() => setOptionsState(options), 200)
		}
	}

	return (
		<div className='input-group'>
			{title && <label htmlFor={name}>{title}</label>}
			<div className='input-wrapper'>
				<input
					type='search'
					id={name}
					name={name}
					placeholder={placeholder}
					onChange={inputChangeHandler}
					value={value}
					ref={inputRef}
					onFocus={() => setDropdown(true)}
					onBlur={() => setDropdown(false)}
					autoComplete='off'
				/>
				{optionsState && optionsState.length !== 0 && (
					<>
						<DropdownArrow dropdown={dropdown} SVGMouseHandler={SVGMouseHandler} />
						<div className={'hidden-wrapper' + (dropdown ? ' active' : '')} onMouseDown={dropdownMouseHandler}>
							<div className='dropdown'>
								<div className='scroll'>
									{optionsState.map(option => (
										<div
											key={option.key}
											className={'option' + (currentOption === option.key ? ' active' : '')}
											onClick={optionClickHandler(option)}>
											{option.title}
										</div>
									))}
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
