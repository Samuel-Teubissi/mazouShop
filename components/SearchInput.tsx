'use client'

import { SearchIcon } from 'lucide-react'
import {
  FormEvent,
  forwardRef,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react'
import clsx from 'clsx'
import { mz_button } from '@/components/primitives'
import { cn } from '@/config/utils'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { mzToast } from '@/lib/utils'

interface BoxProps {
  children?: React.ReactNode
  className?: string
}

type newQueryProps = {
  onQueryChange: ({
    query,
    category,
  }: {
    query: string
    category: string
  }) => void
}

const categList = ['Santé', 'Alimentation', 'Bien-être', 'Education']

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

  const Box = forwardRef<HTMLDivElement, BoxProps>(({ children }, ref) => {
    return <div ref={ref}>{children}</div>
  })

  const MotionBox = motion.create(Button)
  const mzTranslateAppeareance = {
    initial: {
      y: 20,
      rotateX: -90,
      opacity: 0,
      filter: 'blur(4px)',
    },
    animate: {
      y: 0,
      rotateX: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
  }
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
      <div className="flex gap-1 items-center justify-center mt-2 w-full flex-wrap">
        {categList.map((categ, index) => (
          <MotionBox
            layout
            variants={mzTranslateAppeareance}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.3 }}
            key={index}
            onClick={() => {
              handleCategory(categ)
            }}
            className={cn(
              mz_button({
                hoverText: 'secondary',
                hoverBkg: true,
                border: true,
              }),
              'px-4 py-2 mz_dark-btn dark:text-white',
              categ === selectedCategory && 'bg-brand-primary-500',
            )}
          >
            {/* <Button
            as={Link}
            // href={'/?category=' + link}
            key={index}
            onPress={() => {
              handleCategory(categ)
            }}
            className={clsx(
              mz_button({
                hoverText: 'secondary',
                hoverBkg: true,
                border: true,
              }),
              'px-4 py-2 mz_dark-btn dark:text-white',
              categ === selectedCategory && 'bg-brand-primary-500',
            )}
          > */}
            {categ}
            {/* </Button> */}
          </MotionBox>
        ))}
      </div>
    </>
  )
}
