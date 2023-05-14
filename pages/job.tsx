import { MainLayout } from '@/components/MainLayout'
import { JobCard } from '@/components/JobCard'
import { Vacancies } from '@/components/Interfaces/Jobs'

export default function Job({ vacancies }: { vacancies: Vacancies }) {
	return (
		<MainLayout
			title={'Jobored | ' + vacancies.objects[0].profession}
			description={'Страница вакансии ' + vacancies.objects[0].profession}>
			<main>
				<JobCard job={vacancies.objects[0]} single />
				<div className='info-card'>
					<h3>Обязанности:</h3>
					<ul>
						<li>Разработка дизайн-макетов для наружной, интерьерной рекламы, полиграфии, сувенирной продукции.</li>
						<li>Подготовка и вёрстка макетов в CorelDraw, Adobe photoshop.</li>
						<li>Создание дизайна логотипов и брендбуков</li>
						<li>Управленческая функция: обучение, адаптация дизайнеров, их контроль, оценка</li>
					</ul>
					<h3>Требования:</h3>
					<ul>
						<li>Собеседование – после успешного прохождения тестового задания</li>
						<li>Рассматриваются кандидаты только с опытом работы</li>
						<li>Обязательно - наличие портфолио</li>
						<li>
							Умение самостоятельно принимать решения, умение объективно оценивать свою работу, работать в режиме
							многозадачности и переключаться с одного задания к другому и планировать свой день. Соблюдать сроки.
						</li>
						<li>Ответственный, исполнительный, целеустремленный, большим плюсом будет опыт управления</li>
					</ul>
					<h3>Условия:</h3>
					<ul>
						<li>Оформление по контракту</li>
						<li>Полный социальный пакет</li>
						<li>Премирование по результатам работы</li>
					</ul>
				</div>
			</main>
		</MainLayout>
	)
}

Job.getInitialProps = async () => {
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
