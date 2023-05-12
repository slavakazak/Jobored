import { createContext, useContext, useState, ReactNode } from 'react'

interface FiltersContext {
	industry: string
	setIndustry: React.Dispatch<React.SetStateAction<string>>
	industryId: number | null
	setIndustryId: React.Dispatch<React.SetStateAction<number | null>>
	salaryFrom: string
	setSalaryFrom: React.Dispatch<React.SetStateAction<string>>
	salaryTo: string
	setSalaryTo: React.Dispatch<React.SetStateAction<string>>
}

const FiltersContext = createContext<FiltersContext>({
	industry: '',
	setIndustry(value: React.SetStateAction<string>) {},
	industryId: null,
	setIndustryId(id: React.SetStateAction<number | null>) {},
	salaryFrom: '',
	setSalaryFrom(value: React.SetStateAction<string>) {},
	salaryTo: '',
	setSalaryTo(value: React.SetStateAction<string>) {},
})

export const useFilters = () => useContext(FiltersContext)

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
	const [industry, setIndustry] = useState('')
	const [industryId, setIndustryId] = useState<number | null>(null)
	const [salaryFrom, setSalaryFrom] = useState('')
	const [salaryTo, setSalaryTo] = useState('')

	return (
		<FiltersContext.Provider
			value={{
				industry,
				setIndustry,
				industryId,
				setIndustryId,
				salaryFrom,
				setSalaryFrom,
				salaryTo,
				setSalaryTo,
			}}>
			{children}
		</FiltersContext.Provider>
	)
}
