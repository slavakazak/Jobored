import { EmptyState } from '@/components/EmptyState'
import { JobCard } from '@/components/JobCard'
import { MainLayout } from '@/components/MainLayout'
import { Pagination } from '@/components/Pagination'
import { Vacancies } from '@/components/Interfaces/Jobs'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { GetServerSideProps } from 'next'

export default function Favorites({ vacancies }: { vacancies: Vacancies }) {
	return (
		<MainLayout title='Jobored | Избранное' description='Страница избранного'>
			<main>
				{!vacancies || !vacancies.objects || vacancies.objects.length === 0 ? (
					<EmptyState text='Упс, здесь еще ничего нет!' />
				) : (
					<>
						{vacancies.objects.map(job => (
							<JobCard key={job.id} job={job} />
						))}
						<Pagination />
					</>
				)}
			</main>
		</MainLayout>
	)
}

export const getServerSideProps: GetServerSideProps<{ vacancies: Vacancies }> = async () => {
	const fetchParams: FetchParams = await getFetchParams()
	const vacanciesJSON: Vacancies = await getJSON('/2.0/vacancies/', {}, fetchParams)
	return {
		props: {
			vacancies: vacanciesJSON,
		},
	}
}
