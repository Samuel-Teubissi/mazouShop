import { Button } from '@heroui/button'
import { motion, stagger } from 'framer-motion'
import React, {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react'
import { mz_button } from './primitives'
import { cn } from '@/config/utils'
import clsx from 'clsx'
import { Link } from '@heroui/link'
import { PrismaClient } from '@/generated/prisma'
import { getUniqueTagLabels } from '@/app/action/tags'
import Aos from 'aos'
import 'aos/dist/aos.css'

interface BoxProps {
  children?: React.ReactNode
  className?: string
}

const SearchTags = ({
  selectedCategory,
  onSelect,
}: {
  selectedCategory: string
  onSelect: (categ: string) => void
}) => {
  console.log('selectedCategory', selectedCategory)
  const [tags, setTags] = useState<{ label: string }[]>([])

  useEffect(() => {
    const fetchTags = async () => {
      const result = await getUniqueTagLabels()
      if (!result.error) {
        setTags(result.tags)
      }
    }
    fetchTags()
    return () => {}
  }, [])

  const AOS = useCallback(() => {
    Aos.init({
      duration: 300,
      once: true,
    })
  }, [])
  useEffect(() => {
    AOS()
  }, [])

  const categList = tags.map((t) => t.label)
  // const categList = ['Santé', 'Alimentation', 'Bien-être', 'Education']
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
      // transition: stagger(2),
    },
  }

  const renderTagsList = useMemo(
    () =>
      categList.map((categ, index) => (
        // <MotionBox
        // key={index}
        // variants={mzTranslateAppeareance}
        // initial="initial"
        // animate="animate"
        // transition={{ delay: index * 0.3 }}
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
        // >
        <Button
          // as={Link}
          // href={'/?category=' + link}
          key={index}
          onPress={() => {
            onSelect(categ)
            console.log('categ', categ)
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
          // data-aos="fade-right"
          // data-aos-offset={100}
        >
          {categ}
        </Button>
        // </MotionBox>
      )),
    //   [selectedCategory],
    [categList],
  )

  return (
    <div className="flex gap-1 items-center justify-center mt-2 w-full flex-wrap">
      {renderTagsList}
    </div>
  )
}

export default React.memo(SearchTags)
