import { MainLayout } from '@/components/MainLayout'
import { EmptyState } from '@/components/EmptyState'

export default function ErrorPage500() {
	return (
		<MainLayout title='Jobored | Ошибка 500' description='Страница ошибки 500'>
			<EmptyState text='Упс, здесь еще ничего нет!' />
		</MainLayout>
	)
}
