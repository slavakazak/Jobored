import { Filters } from '@/components/filters/Filters'
import { FiltersProvider } from '@/components/filters/FiltersContext'
import { JobCard } from '@/components/JobCard'
import { MainLayout } from '@/components/MainLayout'
import { Pagination } from '@/components/Pagination'
import { Search } from '@/components/Search'
import { Vacancies } from '@/components/Interfaces/Jobs'
import { EmptyState } from '@/components/EmptyState'

export default function Home({ vacancies }: { vacancies: Vacancies }) {
	return (
		<FiltersProvider>
			<MainLayout title='Jobored | Поиск вакансий' description='Страница поиска вакансий'>
				<div className='main-grid'>
					<aside>
						<Filters />
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

Home.getInitialProps = async () => {
	const base = 'https://startup-summer-2023-proxy.onrender.com'
	const xSecretKey = 'GEU4nvd3rej*jeh.eqp'

	const passwordPath = '/2.0/oauth2/password'
	const passwordUrl = new URL(passwordPath, base)
	const passwordSearchParams: { [key: string]: string } = {
		login: 'sergei.stralenia@gmail.com',
		password: 'paralect123',
		client_id: '2356',
		client_secret: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
		hr: '0',
	}
	for (let key in passwordSearchParams) {
		passwordUrl.searchParams.set(key, passwordSearchParams[key])
	}
	const passwordResponse = await fetch(passwordUrl, { headers: { 'x-secret-key': xSecretKey } })
	const passwordJSON = await passwordResponse.json()
	const AccessToken = passwordJSON.access_token

	const fetchParams = {
		headers: {
			'x-secret-key': xSecretKey,
			'X-Api-App-Id': passwordSearchParams.client_secret,
			Authorization: 'Bearer ' + AccessToken,
		},
	}

	const vacanciesPath = '/2.0/vacancies/'
	const vacanciesUrl = new URL(vacanciesPath, base)
	const vacanciesSearchParams: { [key: string]: string } = {}
	for (let key in vacanciesSearchParams) {
		vacanciesUrl.searchParams.set(key, vacanciesSearchParams[key])
	}
	const vacanciesResponse = await fetch(vacanciesUrl, fetchParams)
	const vacanciesJSON = await vacanciesResponse.json()

	return {
		vacancies: vacanciesJSON,
	}
}
