import { Vacancies } from './Interfaces/Jobs'
import { Catalog } from './Interfaces/Catalog'
import { FiltersProvider } from './filters/FiltersContext'
import { MainLayout } from './MainLayout'
import { Filters } from './filters/Filters'
import { Search } from './Search'
import { JobCard } from './JobCard'
import { Pagination } from './Pagination'

export function MainPage({ vacancies, catalogues }: { vacancies: Vacancies; catalogues: Catalog[] }) {
	return (
		<FiltersProvider>
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
						<Pagination total={vacancies.total > 500 ? 500 : vacancies.total} path='/page/' />
					</main>
				</div>
			</MainLayout>
		</FiltersProvider>
	)
}
