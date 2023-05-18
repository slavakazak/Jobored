import { EmptyStateIcon } from './icons/EmptyStateIcon'
import Link from 'next/link'

export function EmptyState({ text, link = true }: { text: string; link?: boolean }) {
	return (
		<div className='empty-state'>
			<EmptyStateIcon />
			<h2>{text}</h2>
			{link && <Link href={'/'}>Поиск Вакансий</Link>}
		</div>
	)
}
