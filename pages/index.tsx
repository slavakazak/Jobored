import { Filters } from '@/components/filters/Filters'
import { FiltersProvider } from '@/components/filters/FiltersContext'
import { JobCard } from '@/components/JobCard'
import { MainLayout } from '@/components/MainLayout'
import { Pagination } from '@/components/Pagination'
import { Search } from '@/components/Search'
import { Jobs } from '@/components/Interfaces/Jobs'
import { EmptyState } from '@/components/EmptyState'

const jobs: Jobs = [
	{
		job: 'Менеджер-дизайнер',
		salary: 'з/п от 70000 rub',
		schedule: 'Полный рабочий день',
		address: 'Новый Уренгой',
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
	},
	{
		job: 'Менеджер-дизайнер',
		salary: 'з/п 55000 - 95000 rub',
		schedule: 'Полный рабочий день',
		address: 'Тюмень',
	},
]

//const jobs: Jobs = null

export default function Home() {
	return (
		<FiltersProvider>
			<MainLayout title='Jobored | Поиск вакансий' description='Страница поиска вакансий'>
				<div className='main-grid'>
					<aside>
						<Filters />
					</aside>
					<main>
						<Search />
						{!jobs || jobs.length == 0 ? (
							<EmptyState text='Упс, здесь еще ничего нет!' link={false} />
						) : (
							<>
								{jobs.map((job, i) => (
									<JobCard key={i} {...job} />
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
