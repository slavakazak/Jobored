import { Vacancies, Job } from '@/components/Interfaces/Jobs'
import { MainLayout } from '@/components/MainLayout'
import { JobCard } from '@/components/JobCard'
import { Pagination } from '@/components/Pagination'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Loader } from '@/components/Loader'
import { EmptyState } from '@/components/EmptyState'

export default function Favorites() {
	const router = useRouter()
	const [vacancies, setVacancies] = useState<Vacancies | null>()
	const [empty, setEmpty] = useState(true)
	useEffect(() => {
		async function load() {
			setVacancies(null)
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
			if (vacanciesJSON.objects.length === 0 || favorites.length === 0 || (page && (+page > maxPage || +page < 1))) {
				setEmpty(true)
			} else {
				setEmpty(false)
			}
			setVacancies(vacanciesJSON)
		}

		load()
	}, [router])

	return (
		<MainLayout title='Jobored | Избранное' description='Страница избранного'>
			<main>
				{vacancies ? (
					empty ? (
						<EmptyState text='Упс, здесь еще ничего нет!' />
					) : (
						<>
							{vacancies.objects.map(job => (
								<JobCard key={job.id} job={job} />
							))}
							<Pagination total={vacancies.total > 500 ? 500 : vacancies.total} />
						</>
					)
				) : (
					<Loader />
				)}
			</main>
		</MainLayout>
	)
}
