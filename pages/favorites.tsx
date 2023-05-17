import { Vacancies, Job } from '@/components/Interfaces/Jobs'
import { MainLayout } from '@/components/MainLayout'
import { JobCard } from '@/components/JobCard'
import { Pagination } from '@/components/Pagination'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Favorites() {
	const router = useRouter()
	const [vacancies, setVacancies] = useState<Vacancies | undefined>()
	useEffect(() => {
		async function load() {
			const { page } = router.query
			const fetchParams: FetchParams = await getFetchParams()
			const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
			const favoritesQuery = favorites.map((favorite: number) => 'ids[]=' + favorite).join('&')
			const vacanciesJSON: Vacancies = await getJSON(
				'/2.0/vacancies/?' + favoritesQuery,
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
				favorites.length === 0 ||
				(page && (+page > maxPage || +page < 1))
			) {
				router.push('/404')
			} else {
				setVacancies(vacanciesJSON)
			}
		}

		load()
	}, [router])

	return (
		<MainLayout title='Jobored | Избранное' description='Страница избранного'>
			{vacancies && (
				<main>
					{vacancies.objects.map(job => (
						<JobCard key={job.id} job={job} />
					))}
					<Pagination total={vacancies.total > 500 ? 500 : vacancies.total} />
				</main>
			)}
		</MainLayout>
	)
}
