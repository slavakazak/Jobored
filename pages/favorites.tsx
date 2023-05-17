import { Vacancies } from '@/components/Interfaces/Jobs'
import { MainLayout } from '@/components/MainLayout'
import { JobCard } from '@/components/JobCard'
import { Pagination } from '@/components/Pagination'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { GetServerSideProps } from 'next'

export default function Favorites({ vacancies }: { vacancies: Vacancies }) {
	return (
		<MainLayout title='Jobored | Избранное' description='Страница избранного'>
			<main>
				{vacancies.objects.map(job => (
					<JobCard key={job.id} job={job} />
				))}
				<Pagination total={vacancies.total > 500 ? 500 : vacancies.total} />
			</main>
		</MainLayout>
	)
}

export const getServerSideProps: GetServerSideProps<{ vacancies: Vacancies }> = async context => {
	const { page } = context.query
	const fetchParams: FetchParams = await getFetchParams()
	const vacanciesJSON: Vacancies = await getJSON(
		'/2.0/vacancies/',
		{
			count: '4',
			page: String(page && +page - 1),
		},
		fetchParams
	)
	const total = vacanciesJSON.total > 500 ? 500 : vacanciesJSON.total
	const maxPage = Math.ceil(total / 4)
	if (
		!vacanciesJSON ||
		!vacanciesJSON.objects ||
		vacanciesJSON.objects.length === 0 ||
		(page && (+page > maxPage || +page < 1))
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
