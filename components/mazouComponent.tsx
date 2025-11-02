import { TextLoop } from '@/components/motion-primitives/text-loop'
import { motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { title } from './primitives'

const HomeBigTitle_Memo = () => {
  interface BoxProps {
    children?: React.ReactNode
    className?: string
  }
  const Box = forwardRef<HTMLDivElement, BoxProps>(({ children }, ref) => {
    return <div ref={ref}>{children}</div>
  })
  const MotionBox = motion(Box)
  const mzAnimateTitle = {
    start: { opacity: 0, y: -15 },
    end: { opacity: 1, y: 0 },
  }
  const mzAnimateTitleLoop = {
    initial: {
      y: 20,
      rotateX: 90,
      opacity: 0,
      filter: 'blur(4px)',
    },
    animate: {
      y: 0,
      rotateX: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: {
      y: -20,
      rotateX: -90,
      opacity: 0,
      filter: 'blur(4px)',
    },
  }
  const mzTitleLoop = [
    'en toute simplicité',
    'juste en un clic',
    'sans prise de tête',
  ]

  return (
    <>
      <div className="max-w-2xl text-center justify-center flex">
        <MotionBox
          variants={mzAnimateTitle}
          initial={'start'}
          whileInView={'end'}
        >
          <span className={title({ size: 'lg' })}>Bienvenue sur&nbsp;</span>
          <span className="bg-gradient-to-br from-[#E44E4E] to-[#831f16] bg-clip-text text-transparent text-6xl lg:text-7xl tracking-tight inline font-black">
            Mazou&nbsp;
          </span>
        </MotionBox>
      </div>
      <div className="flex gap-3 text-center px-4 lg:max-w-4xl tracking-wide">
        <MotionBox
          variants={mzAnimateTitle}
          initial={'start'}
          whileInView={'end'}
        >
          Découvrez nos articles, choisissez ce qui vous plaît et commandez
          <span className="min-w-[200px] inline-block my-2">
            <span className="text-brand-primary-400 font-bold px-4 py-2 rounded-md border border-dashed border-brand-primary-500">
              <TextLoop
                className="overflow-y-clip"
                transition={{
                  type: 'spring',
                  stiffness: 900,
                  damping: 80,
                  mass: 10,
                }}
                variants={mzAnimateTitleLoop}
              >
                {mzTitleLoop.map((mzTL, i) => (
                  <span>{mzTL} !</span>
                ))}
              </TextLoop>
            </span>
          </span>
          <br /> Une fois validé, vous serez redirigé sur WhatsApp pour
          finaliser votre livraison à domicile.
        </MotionBox>
      </div>
    </>
  )
}

export const HomeBigTitle = React.memo(HomeBigTitle_Memo)
