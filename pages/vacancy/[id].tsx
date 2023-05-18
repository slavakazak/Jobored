import { MainLayout } from '@/components/MainLayout'
import { JobCard } from '@/components/JobCard'
import { Job } from '@/components/Interfaces/Jobs'
import { NextPageContext } from 'next'
import { EmptyState } from '@/components/EmptyState'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader } from '@/components/Loader'

export default function Vacancy({ vacancy: serverVacancy }: { vacancy: Job }) {
	const router = useRouter()
	const [vacancy, setVacancy] = useState<Job | null>(serverVacancy)
	useEffect(() => {
		async function load() {
			const fetchParams: FetchParams = await getFetchParams()
			const vacancyJSON: Job = await getJSON(`/2.0/vacancies/${router.query.id}/`, {}, fetchParams)
			setVacancy(vacancyJSON)
		}
		if (!serverVacancy) {
			load()
		}
	}, [])
	return (
		<MainLayout
			title={vacancy && vacancy.profession ? 'Jobored | ' + vacancy.profession : 'Jobored'}
			description={'Страница вакансии' + (vacancy && vacancy.profession ? ' ' + vacancy.profession : '')}>
			<main>
				{vacancy ? (
					vacancy.profession ? (
						<>
							<JobCard job={vacancy} single />
							{vacancy.vacancyRichText ? (
								<div
									className='info-card'
									dangerouslySetInnerHTML={{
										__html: vacancy.vacancyRichText.replace(
											/(<br \/>)|(<br>)|(<br\/>)|(<script>)|(<script \/>)|(<script\/>)+/g,
											''
										),
									}}
								/>
							) : (
								<div className='info-card'>
									{vacancy.candidat?.split('\n').map((el, i) => (
										<p key={i}>{el}</p>
									))}
								</div>
							)}
						</>
					) : (
						<EmptyState text='Упс, здесь еще ничего нет!' />
					)
				) : (
					<Loader />
				)}
			</main>
		</MainLayout>
	)
}

Vacancy.getInitialProps = async (context: NextPageContext) => {
	if (!context.req) {
		return {
			vacancy: null,
		}
	}
	const fetchParams: FetchParams = await getFetchParams()
	const vacancyJSON: Job = await getJSON(`/2.0/vacancies/${context.query.id}/`, {}, fetchParams)
	return {
		vacancy: vacancyJSON,
	}
}
