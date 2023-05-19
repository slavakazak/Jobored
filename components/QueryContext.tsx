import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'

interface QueryContext {
	industry: string
	setIndustry: React.Dispatch<React.SetStateAction<string>>
	cataloguesKey: number | null
	setCataloguesKey: React.Dispatch<React.SetStateAction<number | null>>
	paymentFrom: string
	setPaymentFrom: React.Dispatch<React.SetStateAction<string>>
	paymentTo: string
	setPaymentTo: React.Dispatch<React.SetStateAction<string>>
	keyword: string
	setKeyword: React.Dispatch<React.SetStateAction<string>>
	reset: () => void
	apply: () => void
}

const QueryContext = createContext<QueryContext>({
	industry: '',
	setIndustry(value: React.SetStateAction<string>) {},
	cataloguesKey: null,
	setCataloguesKey(id: React.SetStateAction<number | null>) {},
	paymentFrom: '',
	setPaymentFrom(value: React.SetStateAction<string>) {},
	paymentTo: '',
	setPaymentTo(value: React.SetStateAction<string>) {},
	keyword: '',
	setKeyword(value: React.SetStateAction<string>) {},
	reset() {},
	apply() {},
})

export const useQuery = () => useContext(QueryContext)

export const QueryProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter()
	const [industry, setIndustry] = useState('')
	const [cataloguesKey, setCataloguesKey] = useState<number | null>(null)
	const [paymentFrom, setPaymentFrom] = useState('')
	const [paymentTo, setPaymentTo] = useState('')
	const [keyword, setKeyword] = useState('')

	function reset() {
		setIndustry('')
		setCataloguesKey(null)
		setPaymentFrom('')
		setPaymentTo('')
		setKeyword('')
	}

	function apply() {
		router.push({
			pathname: router.pathname,
			query: {
				payment_from: paymentFrom,
				payment_to: paymentTo,
				catalogues: cataloguesKey,
				keyword: keyword,
			},
		})
	}

	return (
		<QueryContext.Provider
			value={{
				industry,
				setIndustry,
				cataloguesKey,
				setCataloguesKey,
				paymentFrom,
				setPaymentFrom,
				paymentTo,
				setPaymentTo,
				keyword,
				setKeyword,
				reset,
				apply,
			}}>
			{children}
		</QueryContext.Provider>
	)
}
