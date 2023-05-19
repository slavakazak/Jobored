import { Vacancies } from '@/components/Interfaces/Jobs'
import { Catalog } from '@/components/Interfaces/Catalog'
import { MainLayout } from '@/components/MainLayout'
import { Filters } from '@/components/filters/Filters'
import { Search } from '@/components/Search'
import { JobCard } from '@/components/JobCard'
import { Pagination } from '@/components/Pagination'
import { NextPageContext } from 'next'
import { getMainPageProps } from '@/utils/startupSummerAPI'
import { Loader } from '@/components/Loader'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { EmptyState } from '@/components/EmptyState'
import { QueryProvider } from '@/components/QueryContext'

export default function Home({
	vacancies: serverVacancies,
	catalogues: serverCatalogues,
}: {
	vacancies: Vacancies
	catalogues: Catalog[]
}) {
	const router = useRouter()
	const [vacancies, setVacancies] = useState<Vacancies | null>(serverVacancies)
	const [catalogues, setCatalogues] = useState<Catalog[] | null>(serverCatalogues)
	const [maxPage, setMaxPage] = useState(
		serverVacancies ? Math.ceil((serverVacancies.total > 500 ? 500 : serverVacancies.total) / 4) : 0
	)
	useEffect(() => {
		async function load() {
			setVacancies(null)
			setCatalogues(null)
			try {
				const { vacanciesJSON, cataloguesJSON } = await getMainPageProps(router.query)
				setVacancies(vacanciesJSON)
				setCatalogues(cataloguesJSON)
				setMaxPage(vacancies ? Math.ceil((vacancies.total > 500 ? 500 : vacancies.total) / 4) : 0)
			} catch (e) {
				console.log(e)
			}
		}
		if (!serverVacancies || !serverCatalogues) {
			load()
		}
	}, [router])

	return (
		<QueryProvider>
			<MainLayout title='Jobored | Поиск вакансий' description='Страница поиска вакансий'>
				<div className='main-grid'>
					<aside>
						<Filters catalogues={catalogues} />
					</aside>
					<main>
						<Search />
						{vacancies ? (
							vacancies.objects.length === 0 ||
							(router.query.page && (+router.query.page > maxPage || +router.query.page < 1)) ? (
								<EmptyState text='Упс, здесь еще ничего нет!' link={false} />
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
				</div>
			</MainLayout>
		</QueryProvider>
	)
}

Home.getInitialProps = async (context: NextPageContext) => {
	if (!context.req) {
		return {
			vacancies: null,
			catalogues: null,
		}
	}
	try {
		const { vacanciesJSON, cataloguesJSON } = await getMainPageProps(context.query)
		return {
			vacancies: vacanciesJSON,
			catalogues: cataloguesJSON,
		}
	} catch (e) {
		console.log(e)
		return {
			vacancies: null,
			catalogues: null,
		}
	}
}
