'use client'

import { SearchIcon } from 'lucide-react'
import {
  FormEvent,
  forwardRef,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react'
import { mz_button } from '@/components/primitives'
import { cn } from '@/config/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchTags from './SearchTags'

type newQueryProps = {
  onQueryChange: ({
    query,
    category,
  }: {
    query: string
    category: string
  }) => void
}

export const SearchInput = ({ onQueryChange }: newQueryProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get('q') || ''
  const initialCateg = searchParams.get('categ') || ''

  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCateg)

  const updateURL = (newQuery: string, newCategory: string) => {
    const params = new URLSearchParams()
    if (newQuery) params.set('q', newQuery)
    if (newCategory) params.set('categ', newCategory)
    router.replace(`?${params.toString()}`, { scroll: false })
    onQueryChange?.({ query, category: selectedCategory })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // alert('confirm')
    if (!query) return ''
    updateURL(query, selectedCategory)
  }
  const handleCategory = (category: string) => {
    setSelectedCategory(category)
    updateURL(query, category)
  }

  useEffect(() => {
    onQueryChange?.({ query, category: selectedCategory })
  }, [query, selectedCategory])

  return (
    <>
      <form
        className="w-full md:w-[700] p-1 rounded-md bg-white flex"
        onSubmit={handleSearch}
      >
        <input
          type="search"
          name="mzs_search"
          className="w-full py-2 px-4 border-none outline-none text-black/90"
          placeholder="Rechercher un article"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        <button
          type="submit"
          className={cn(
            mz_button({
              bkg: 'secondary',
              hoverText: 'secondary',
              hoverBkg: true,
              border: false,
              radius: 'small',
            }),
            'px-4 h-10 box-border flex justify-center items-center hover:bg-brand-primary-400',
          )}
        >
          <SearchIcon className="w-5 h-5 text-white" />
        </button>
      </form>
      <SearchTags
        selectedCategory={selectedCategory}
        onSelect={handleCategory}
      />
    </>
  )
}
