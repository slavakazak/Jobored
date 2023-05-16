import { Vacancies } from '@/components/Interfaces/Jobs'
import { Catalog } from '@/components/Interfaces/Catalog'
import { MainPage } from '@/components/MainPage'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { GetServerSideProps } from 'next'

export default function Home({ vacancies, catalogues }: { vacancies: Vacancies; catalogues: Catalog[] }) {
	return <MainPage vacancies={vacancies} catalogues={catalogues} />
}

export const getServerSideProps: GetServerSideProps<{ vacancies: Vacancies; catalogues: Catalog[] }> = async () => {
	const fetchParams: FetchParams = await getFetchParams()
	const vacanciesJSON: Vacancies = await getJSON('/2.0/vacancies/', { count: '4' }, fetchParams)
	const cataloguesJSON: Catalog[] = await getJSON('/2.0/catalogues/', {}, fetchParams)
	if (!vacanciesJSON || !vacanciesJSON.objects || vacanciesJSON.objects.length === 0) {
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
