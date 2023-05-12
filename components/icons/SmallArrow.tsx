export function SmallArrow({ className = '', onClick }: { className?: string; onClick?: React.MouseEventHandler }) {
	return (
		<svg viewBox='0 0 12 12' fill='none' className={className} onClick={onClick}>
			<path
				d='M9.50006 7.5L6.39054 4.83469C6.16584 4.6421 5.83428 4.6421 5.60959 4.83469L2.50006 7.5'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
		</svg>
	)
}
