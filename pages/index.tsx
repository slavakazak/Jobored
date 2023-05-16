import { Filters } from '@/components/filters/Filters'
import { FiltersProvider } from '@/components/filters/FiltersContext'
import { JobCard } from '@/components/JobCard'
import { MainLayout } from '@/components/MainLayout'
import { Pagination } from '@/components/Pagination'
import { Search } from '@/components/Search'
import { Vacancies } from '@/components/Interfaces/Jobs'
import { Catalog } from '@/components/Interfaces/Catalog'
import { EmptyState } from '@/components/EmptyState'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { GetServerSideProps } from 'next'

export default function Home({ vacancies, catalogues }: { vacancies: Vacancies; catalogues: Catalog[] }) {
	return (
		<FiltersProvider>
			<MainLayout title='Jobored | Поиск вакансий' description='Страница поиска вакансий'>
				<div className='main-grid'>
					<aside>
						<Filters catalogues={catalogues} />
					</aside>
					<main>
						<Search />
						{!vacancies || !vacancies.objects || vacancies.objects.length === 0 ? (
							<EmptyState text='Упс, здесь еще ничего нет!' link={false} />
						) : (
							<>
								{vacancies.objects.map(job => (
									<JobCard key={job.id} job={job} />
								))}
								<Pagination />
							</>
						)}
					</main>
				</div>
			</MainLayout>
		</FiltersProvider>
	)
}

export const getServerSideProps: GetServerSideProps<{ vacancies: Vacancies; catalogues: Catalog[] }> = async () => {
	const fetchParams: FetchParams = await getFetchParams()
	const vacanciesJSON: Vacancies = await getJSON('/2.0/vacancies/', {}, fetchParams)
	const cataloguesJSON: Catalog[] = await getJSON('/2.0/catalogues/', {}, fetchParams)
	return {
		props: {
			vacancies: vacanciesJSON,
			catalogues: cataloguesJSON,
		},
	}
}
