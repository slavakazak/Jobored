import { MainLayout } from '@/components/MainLayout'
import { EmptyState } from '@/components/EmptyState'

export default function ErrorPage404() {
	return (
		<MainLayout title='Jobored | Ошибка 404' description='Страница ошибки 404'>
			<EmptyState text='Упс, здесь еще ничего нет!' />
		</MainLayout>
	)
}
