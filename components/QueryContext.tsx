import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'

type set<T> = React.Dispatch<React.SetStateAction<T>>

interface QueryContext {
	industry: string
	setIndustry: set<string>
	cataloguesKey: number | null
	setCataloguesKey: set<number | null>
	paymentFrom: string
	setPaymentFrom: set<string>
	paymentTo: string
	setPaymentTo: set<string>
	keyword: string
	setKeyword: set<string>
	reset: () => void
	apply: () => void
}

function plugValue(value: React.SetStateAction<string>) {}
function plugId(id: React.SetStateAction<number | null>) {}

const QueryContext = createContext<QueryContext>({
	industry: '',
	setIndustry: plugValue,
	cataloguesKey: null,
	setCataloguesKey: plugId,
	paymentFrom: '',
	setPaymentFrom: plugValue,
	paymentTo: '',
	setPaymentTo: plugValue,
	keyword: '',
	setKeyword: plugValue,
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
