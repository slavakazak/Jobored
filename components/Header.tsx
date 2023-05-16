import { useRouter } from 'next/router'
import { Logo } from './Logo'
import Link from 'next/link'
import { link } from 'fs'

const navigateLinks = [
	{
		path: '/',
		text: 'Поиск Вакансий',
	},
	{
		path: '/favorites',
		text: 'Избранное',
	},
]

export function Header() {
	const router = useRouter()
	return (
		<header>
			<div className='wrapper'>
				<div className='header-grid'>
					<Logo />
					<nav>
						{navigateLinks.map(({ path, text }, i) => (
							<Link
								key={i}
								href={path}
								className={
									'navigate-link' +
									(router.pathname.replace('page/[number]', '') === path ||
									router.pathname.replace('/page/[number]', '') === path
										? ' active'
										: '')
								}>
								{text}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</header>
	)
}
