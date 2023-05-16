import Link from 'next/link'
import { PaginationIcon } from './icons/PaginationIcon'
import { useRouter } from 'next/router'

export function Pagination({ total, path }: { total: number; path: string }) {
	const router = useRouter()

	function getLinks() {
		let number = router.query.number && router.query.number !== '0' ? +router.query.number : 1
		const pages = Math.ceil(total / 4)
		let firstPage = false
		let lastPage = false
		let links: number[] = []
		if (pages === 1) {
			links = []
		} else if (pages === 2) {
			links = [1, 2]
		} else if (number === 1) {
			links = [1, 2, 3]
			firstPage = true
		} else if (number === pages) {
			links = [pages - 2, pages - 1, pages]
			lastPage = true
		} else {
			links = [number - 1, number, number + 1]
		}

		return {
			links,
			number,
			firstPage,
			lastPage,
		}
	}

	const linksObj = getLinks()

	if (linksObj.links.length === 0) {
		return <></>
	} else {
		return (
			<div className='pagination'>
				{linksObj.firstPage ? (
					<div className={'pagination-link previous disabled'}>
						<PaginationIcon />
					</div>
				) : (
					<Link href={path + (linksObj.number - 1)} className={'pagination-link previous'}>
						<PaginationIcon />
					</Link>
				)}
				{linksObj.links.map((link, i) => {
					if (link === linksObj.number) {
						return (
							<div key={i} className='pagination-link active'>
								{link}
							</div>
						)
					} else {
						return (
							<Link key={i} href={path + link} className='pagination-link'>
								{link}
							</Link>
						)
					}
				})}
				{linksObj.lastPage ? (
					<div className={'pagination-link next disabled'}>
						<PaginationIcon />
					</div>
				) : (
					<Link href={path + (linksObj.number + 1)} className={'pagination-link next'}>
						<PaginationIcon />
					</Link>
				)}
			</div>
		)
	}
}
