import Link from 'next/link'
import { PaginationIcon } from './icons/PaginationIcon'

export function Pagination() {
	return (
		<div className='pagination'>
			<Link href={'/'} className='pagination-link previous disabled'>
				<PaginationIcon />
			</Link>
			<Link href={'/'} className='pagination-link active'>
				1
			</Link>
			<Link href={'/'} className='pagination-link'>
				2
			</Link>
			<Link href={'/'} className='pagination-link'>
				3
			</Link>
			<Link href={'/'} className='pagination-link next'>
				<PaginationIcon />
			</Link>
		</div>
	)
}
