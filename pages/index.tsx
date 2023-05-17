import { Vacancies } from '@/components/Interfaces/Jobs'
import { Catalog } from '@/components/Interfaces/Catalog'
import { MainLayout } from '@/components/MainLayout'
import { Filters } from '@/components/filters/Filters'
import { Search } from '@/components/Search'
import { JobCard } from '@/components/JobCard'
import { Pagination } from '@/components/Pagination'
import { GetServerSideProps } from 'next'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'

export default function Home({ vacancies, catalogues }: { vacancies: Vacancies; catalogues: Catalog[] }) {
	return (
		<MainLayout title='Jobored | Поиск вакансий' description='Страница поиска вакансий'>
			<div className='main-grid'>
				<aside>
					<Filters catalogues={catalogues} />
				</aside>
				<main>
					<Search />
					{vacancies.objects.map(job => (
						<JobCard key={job.id} job={job} />
					))}
					<Pagination total={vacancies.total > 500 ? 500 : vacancies.total} />
				</main>
			</div>
		</MainLayout>
	)
}

export const getServerSideProps: GetServerSideProps<{
	vacancies: Vacancies
	catalogues: Catalog[]
}> = async context => {
	const fetchParams: FetchParams = await getFetchParams()
	const vacanciesSearchParams: { [key: string]: string } = {
		count: '4',
	}
	for (let key in context.query) {
		if (key === 'page') vacanciesSearchParams.page = String(context.query.page && +context.query.page - 1)
		else vacanciesSearchParams[key] = String(context.query[key])
	}
	const vacanciesJSON: Vacancies = await getJSON('/2.0/vacancies/', vacanciesSearchParams, fetchParams)
	const cataloguesJSON: Catalog[] = await getJSON('/2.0/catalogues/', {}, fetchParams)
	const total = vacanciesJSON.total > 500 ? 500 : vacanciesJSON.total
	const maxPage = Math.ceil(total / 4)
	if (
		!vacanciesJSON ||
		!vacanciesJSON.objects ||
		vacanciesJSON.objects.length === 0 ||
		(context.query.page && (+context.query.page > maxPage || +context.query.page < 1))
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
