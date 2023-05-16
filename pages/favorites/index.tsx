import { Vacancies } from '@/components/Interfaces/Jobs'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { GetServerSideProps } from 'next'
import { FavoritesPage } from '@/components/FavoritesPage'

export default function Favorites({ vacancies }: { vacancies: Vacancies }) {
	return <FavoritesPage vacancies={vacancies} />
}

export const getServerSideProps: GetServerSideProps<{ vacancies: Vacancies }> = async () => {
	const fetchParams: FetchParams = await getFetchParams()
	const vacanciesJSON: Vacancies = await getJSON('/2.0/vacancies/', { count: '4' }, fetchParams)
	if (!vacanciesJSON || !vacanciesJSON.objects || vacanciesJSON.objects.length === 0) {
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
