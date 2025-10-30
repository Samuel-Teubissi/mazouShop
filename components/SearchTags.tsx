import { Button } from '@heroui/button'
import { motion } from 'framer-motion'
import React, { forwardRef, useMemo } from 'react'
import { mz_button } from './primitives'
import { cn } from '@/config/utils'
import clsx from 'clsx'
import { Link } from '@heroui/link'

interface BoxProps {
  children?: React.ReactNode
  className?: string
}

const categList = ['Santé', 'Alimentation', 'Bien-être', 'Education']

const SearchTags = React.memo(
  ({
    selectedCategory,
    onSelect,
  }: {
    selectedCategory: string
    onSelect: (categ: string) => void
  }) => {
    const Box = forwardRef<HTMLDivElement, BoxProps>(({ children }, ref) => {
      return <div ref={ref}>{children}</div>
    })
    const MotionBox = motion.create(Box)
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

    const renderTagsList = useMemo(
      () =>
        categList.map((categ, index) => (
          <MotionBox
            variants={mzTranslateAppeareance}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.3 }}
            key={index}
            //     // onClick={() => {
            //     //   onSelect(categ)
            //     // }}
            //     className={cn(
            //       mz_button({
            //         hoverText: 'secondary',
            //         hoverBkg: true,
            //         border: true,
            //       }),
            //       'px-4 py-2 mz_dark-btn dark:text-white',
            //       categ === selectedCategory && 'bg-brand-primary-500',
            //     )}
          >
            <Button
              // as={Link}
              // href={'/?category=' + link}
              key={index}
              onPress={() => {
                onSelect(categ)
              }}
              className={cn(
                mz_button({
                  hoverText: 'secondary',
                  hoverBkg: true,
                  border: true,
                }),
                'px-4 py-2 mz_dark-btn dark:text-white',
                categ === selectedCategory ? 'bg-brand-primary-500' : null,
              )}
            >
              {categ}
            </Button>
          </MotionBox>
        )),
      //   [selectedCategory],
      [],
    )

    return (
      <div className="flex gap-1 items-center justify-center mt-2 w-full flex-wrap">
        {renderTagsList}
      </div>
    )
  },
)

export default SearchTags
