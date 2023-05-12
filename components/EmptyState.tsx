import React from 'react'
import { EmptyStateIcon } from './icons/EmptyStateIcon'
import Link from 'next/link'

interface EmptyState {
	text: string
	link?: boolean
}

export function EmptyState({ text, link = true }: EmptyState) {
	return (
		<div className='empty-state'>
			<EmptyStateIcon />
			<h2>Упс, здесь еще ничего нет!</h2>
			{link && <Link href={'/'}>Поиск Вакансий</Link>}
		</div>
	)
}
