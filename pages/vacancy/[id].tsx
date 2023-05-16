import { MainLayout } from '@/components/MainLayout'
import { JobCard } from '@/components/JobCard'
import { Job } from '@/components/Interfaces/Jobs'
import { GetServerSideProps } from 'next'
import { EmptyState } from '@/components/EmptyState'
import { getFetchParams, getJSON, FetchParams } from '@/utils/startupSummerAPI'

export default function Vacancy({ vacancy }: { vacancy: Job }) {
	return (
		<MainLayout title={'Jobored | ' + vacancy.profession} description={'Страница вакансии ' + vacancy.profession}>
			<main>
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
			</main>
		</MainLayout>
	)
}

export const getServerSideProps: GetServerSideProps<{ vacancy: Job }> = async ({ query }) => {
	const fetchParams: FetchParams = await getFetchParams()
	const vacancyJSON: Job = await getJSON(`/2.0/vacancies/${query.id}/`, {}, fetchParams)
	if (!vacancyJSON || !vacancyJSON.profession) {
		return {
			notFound: true,
		}
	}
	return {
		props: {
			vacancy: vacancyJSON,
		},
	}
}
