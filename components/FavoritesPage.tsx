import { Vacancies } from './Interfaces/Jobs'
import { MainLayout } from './MainLayout'
import { JobCard } from './JobCard'
import { Pagination } from './Pagination'

export function FavoritesPage({ vacancies }: { vacancies: Vacancies }) {
	return (
		<MainLayout title='Jobored | Избранное' description='Страница избранного'>
			<main>
				{vacancies.objects.map(job => (
					<JobCard key={job.id} job={job} />
				))}
				<Pagination total={vacancies.total > 500 ? 500 : vacancies.total} path='/favorites/page/' />
			</main>
		</MainLayout>
	)
}
