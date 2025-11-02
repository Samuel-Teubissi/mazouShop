import { CircleArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export const MazouBreadcrumbs = () => {
  return (
    <div className="text-small text-gray-700 py-3 px-6 box-border dark:text-dark-text mt-[80px] lg:mt-auto">
      <Link
        href="/"
        title="Mazou Homepage"
        className="hover:text-brand-primary-400 flex gap-2"
      >
        <CircleArrowLeftIcon strokeWidth={1.5} width={24} height={24} />{' '}
        <span>Retourner à l'acceuil</span>
      </Link>
    </div>
  )
}
