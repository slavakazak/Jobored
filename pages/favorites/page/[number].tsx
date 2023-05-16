import { Vacancies } from '@/components/Interfaces/Jobs'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { GetServerSideProps } from 'next'
import { FavoritesPage } from '@/components/FavoritesPage'

export default function Favorites({ vacancies }: { vacancies: Vacancies }) {
	return <FavoritesPage vacancies={vacancies} />
}

export const getServerSideProps: GetServerSideProps<{ vacancies: Vacancies }> = async ({ query }) => {
	const fetchParams: FetchParams = await getFetchParams()
	const vacanciesJSON: Vacancies = await getJSON(
		'/2.0/vacancies/',
		{ count: '4', page: String(query.number && +query.number - 1) },
		fetchParams
	)
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
		},
	}
}
