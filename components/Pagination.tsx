import Link from 'next/link'
import { PaginationIcon } from './icons/PaginationIcon'
import { useRouter } from 'next/router'
import { searchParams } from '@/utils/searchParams'

export function Pagination({ total }: { total: number }) {
	const router = useRouter()

	function getLinks() {
		let page = router.query.page && router.query.page !== '0' ? +router.query.page : 1
		const pages = Math.ceil(total / 4)
		let firstPage = false
		let lastPage = false
		let links: number[] = []
		if (pages === 1) {
			links = []
		} else if (pages === 2) {
			links = [1, 2]
			if (page === 1) {
				firstPage = true
			} else {
				lastPage = true
			}
		} else if (page === 1) {
			links = [1, 2, 3]
			firstPage = true
		} else if (page === pages) {
			links = [pages - 2, pages - 1, pages]
			lastPage = true
		} else {
			links = [page - 1, page, page + 1]
		}

		return {
			links,
			page,
			firstPage,
			lastPage,
		}
	}

	function getPath(page: number) {
		return router.pathname + searchParams({ ...router.query, page: String(page) })
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
					<Link href={getPath(linksObj.page - 1)} className={'pagination-link previous'}>
						<PaginationIcon />
					</Link>
				)}
				{linksObj.links.map((link, i) => {
					if (link === linksObj.page) {
						return (
							<div key={i} className='pagination-link active'>
								{link}
							</div>
						)
					} else {
						return (
							<Link key={i} href={getPath(link)} className='pagination-link'>
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
					<Link href={getPath(linksObj.page + 1)} className={'pagination-link next'}>
						<PaginationIcon />
					</Link>
				)}
			</div>
		)
	}
}
