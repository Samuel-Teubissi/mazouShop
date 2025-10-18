'use client'

import { SearchIcon } from 'lucide-react'
import { FormEvent, forwardRef, MouseEventHandler } from 'react'
import clsx from 'clsx'
import { mz_button } from '@/components/primitives'
import { cn } from '@/config/utils'
import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { motion } from 'framer-motion'

export const SearchInput = () => {
  interface BoxProps {
    children?: React.ReactNode
    className?: string
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // alert('confirm')
  }
  const handleSearch = (e: MouseEventHandler<HTMLButtonElement>) => {
    alert('search')
  }
  const Box = forwardRef<HTMLDivElement, BoxProps>(({ children }, ref) => {
    return <div ref={ref}>{children}</div>
  })
  const Link_navbar = ['Santé', 'Alimentation', 'Bien-être', 'Education']
  const MotionBox = motion(Box)
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
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          name="mzs_search"
          className="w-full py-2 px-4 border-none outline-none text-black/90"
          placeholder="Rechercher un article"
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
        {Link_navbar.map((link, index) => (
          <MotionBox
            variants={mzTranslateAppeareance}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.3 }}
            key={index}
          >
            <Button
              as={Link}
              href={'/?categorie=' + link}
              // onClick={handleSearch}
              className={clsx(
                mz_button({
                  hoverText: 'secondary',
                  hoverBkg: true,
                  border: true,
                }),
                'px-4 py-2 mz_dark-btn dark:text-white',
              )}
            >
              {link}
            </Button>
          </MotionBox>
        ))}
      </div>
    </>
  )
}
