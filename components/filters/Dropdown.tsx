import { useState, useRef, useEffect } from 'react'
import { DropdownArrow } from '../icons/DropdownArrow'

interface Option {
	title: string
	key: number
}

interface Dropdown {
	name: string
	title?: string
	placeholder?: string
	options?: Option[] | null
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
	currentOption: number | null
	setCurrentOption: React.Dispatch<React.SetStateAction<number | null>>
	dataElem?: string
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
	dataElem,
}: Dropdown) {
	const [dropdown, setDropdown] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const [optionsState, setOptionsState] = useState(options)

	useEffect(() => {
		let filteredOptions = options
		if (!currentOption && options) {
			filteredOptions = options.filter(option => option.title.trim().toLowerCase().includes(value.trim().toLowerCase()))
		}
		setOptionsState(filteredOptions)
	}, [options, value])

	function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const text = e.target.value
		setValue(text)
		setCurrentOption(null)
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

	function selectChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
		setCurrentOption(+e.target.value)
		setValue(options?.find(option => option.key === +e.target.value)?.title || '')
		setOptionsState(options)
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
				<select
					name={name + '-select'}
					onChange={selectChangeHandler}
					value={currentOption ? String(currentOption) : ''}
					data-elem={dataElem}>
					<option value='' />
					{options &&
						options.map(option => (
							<option key={option.key} value={option.key}>
								{option.title}
							</option>
						))}
				</select>
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
