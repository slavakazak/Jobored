import { Vacancies } from '@/components/Interfaces/Jobs'
import { Catalog } from '@/components/Interfaces/Catalog'
import { MainPage } from '@/components/MainPage'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { GetServerSideProps } from 'next'

export default function Page({ vacancies, catalogues }: { vacancies: Vacancies; catalogues: Catalog[] }) {
	return <MainPage vacancies={vacancies} catalogues={catalogues} />
}

export const getServerSideProps: GetServerSideProps<{ vacancies: Vacancies; catalogues: Catalog[] }> = async ({
	query,
}) => {
	const fetchParams: FetchParams = await getFetchParams()
	const vacanciesJSON: Vacancies = await getJSON(
		'/2.0/vacancies/',
		{ count: '4', page: String(query.number && +query.number - 1) },
		fetchParams
	)
	const cataloguesJSON: Catalog[] = await getJSON('/2.0/catalogues/', {}, fetchParams)
	const total = vacanciesJSON.total > 500 ? 500 : vacanciesJSON.total
	const maxPage = total / 4
	if (
		!vacanciesJSON ||
		!vacanciesJSON.objects ||
		vacanciesJSON.objects.length === 0 ||
		(query.number && (+query.number > maxPage || +query.number < 1))
	) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			vacancies: vacanciesJSON,
			catalogues: cataloguesJSON,
		},
	}
}