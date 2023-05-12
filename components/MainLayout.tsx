import Head from 'next/head'
import { Header } from './Header'

interface MainLayout {
	children?: JSX.Element | JSX.Element[]
	title?: string
	description?: string
}

export function MainLayout({ children, title = 'Jobored', description }: MainLayout) {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
				<title>{title}</title>
				<meta name='description' content={description} />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			{children && <div className='wrapper'>{children}</div>}
		</>
	)
}
