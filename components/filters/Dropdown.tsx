import { useState, useEffect, useRef } from 'react'

export interface Option {
	text: string
	id: number
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
			options && options.filter(option => option.text.trim().toLowerCase().includes(text.trim().toLowerCase()))
		setOptionsState(filteredOptions)
	}

	function SVGMOuseHandler(e: React.MouseEvent<SVGSVGElement>) {
		e.preventDefault()
		if (inputRef && inputRef.current) {
			if (dropdown) {
				inputRef.current.blur()
			} else {
				inputRef.current.focus()
			}
		}
	}

	function dropdownMOuseHandler(e: React.MouseEvent<HTMLDivElement>) {
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
			setCurrentOption(option.id)
			setValue(option.text)
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
						<svg
							className={'arrow' + (dropdown ? ' active' : '')}
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							onMouseDown={SVGMOuseHandler}>
							<path
								d='M5 9L11.2191 14.3306C11.6684 14.7158 12.3316 14.7158 12.7809 14.3306L19 9'
								strokeWidth='1.5'
								strokeLinecap='round'
							/>
						</svg>
						<div className={'hidden-wrapper' + (dropdown ? ' active' : '')} onMouseDown={dropdownMOuseHandler}>
							<div className='dropdown'>
								<div className='scroll'>
									{optionsState.map(option => (
										<div
											key={option.id}
											className={'option' + (currentOption === option.id ? ' active' : '')}
											onClick={optionClickHandler(option)}>
											{option.text}
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
