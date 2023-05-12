import { EmptyState } from '@/components/EmptyState'
import { JobCard } from '@/components/JobCard'
import { MainLayout } from '@/components/MainLayout'
import { Pagination } from '@/components/Pagination'
import { Jobs } from '@/components/Interfaces/Jobs'

const jobs: Jobs = [
	{
		job: 'Менеджер-дизайнер',
		salary: 'з/п от 70000 rub',
		schedule: 'Полный рабочий день',
		address: 'Новый Уренгой',
		isFavorite: true,
	},
	{
		job: 'Ведущий графический дизайнер НЕ УДАЛЕННО',
		salary: 'з/п от 80000 rub',
		schedule: 'Полный рабочий день',
		address: 'Москва',
		isFavorite: true,
	},
	{
		job: 'Работник декорации, дизайнер (ТЦ Амбар)',
		salary: 'з/п 29000 rub',
		schedule: 'Сменный график работы',
		address: 'Самара',
		isFavorite: true,
	},
	{
		job: 'Менеджер-дизайнер',
		salary: 'з/п 55000 - 95000 rub',
		schedule: 'Полный рабочий день',
		address: 'Тюмень',
		isFavorite: true,
	},
]

//const jobs: Jobs = null

export default function favorites() {
	return (
		<MainLayout title='Jobored | Избранное' description='Страница избранного'>
			<main>
				{!jobs || jobs.length == 0 ? (
					<EmptyState text='Упс, здесь еще ничего нет!' />
				) : (
					<>
						{jobs.map((job, i) => (
							<JobCard key={i} {...job} />
						))}
						<Pagination />
					</>
				)}
			</main>
		</MainLayout>
	)
}
