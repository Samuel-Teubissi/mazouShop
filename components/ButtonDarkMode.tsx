'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@heroui/button'
import clsx from 'clsx'
import { mz_button } from './primitives'

export const ButtonDarkMode = () => {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // const handleKeyDown = (event: KeyboardEvent) => {
    //   if (event.target instanceof HTMLLabelElement && event.key === 'Enter') {
    //     const target = event.target as HTMLLabelElement
    //     if (target.htmlFor) {
    //       const assiociatedElement = document.getElementById(target.htmlFor)
    //       assiociatedElement?.click()
    //     }
    //   }
    // }
    // document.addEventListener('keydown', handleKeyDown)
    // return () => {
    //   document.removeEventListener('keydown', handleKeyDown)
    // }
    const darkModeLabel = document.querySelector(
      'label[for="switchDark"]',
    ) as HTMLLabelElement
    if (darkModeLabel) {
      const handleLabelDark = (event: KeyboardEvent): void => {
        if (event.key === 'Enter') {
          document.getElementById('switchDark')?.click()
        }
      }
      darkModeLabel.addEventListener('keydown', handleLabelDark)
      return () => {
        darkModeLabel.removeEventListener('keydown', handleLabelDark)
      }
    }
  }, [])
  const setThemeApp = (theme: string) => {
    // const theme = props.Theme
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }
  const [openDarkDiv, setOpenDarkDiv] = useState(false)
  const handleDarkMode = () => {
    const isDark = document.documentElement.classList.contains('dark')
    setOpenDarkDiv(!openDarkDiv)
    setTimeout(() => {
      setThemeApp(isDark ? 'light' : 'dark')
    }, 300)
    // isDark
    //   ? setTimeout(() => {
    //       setThemeApp('light')
    //     }, 700)
    //   : setTimeout(() => {
    //       setThemeApp('dark')
    //     }, 100)
  }
  return (
    <div className="switchDark overflow-hidden text-black/90 dark:text-white relative">
      {/* <input type="checkbox" onChange={handleDarkMode} id="switchDark" /> */}
      <Button
        color="default"
        variant="flat"
        size="md"
        className={clsx(
          mz_button({
            hoverText: 'secondary',
            hoverBkg: true,
            border: true,
          }),
          'min-w-auto mz_dark-btn rounded-lg z-50 !bg-gray-100/50 dark:!bg-dark-btn',
        )}
        // onChange={handleDarkMode}
        onClick={handleDarkMode}
      >
        {/* <label
          htmlFor="switchDark"
          // className="border border-transparent rounded-lg p-1.5 bg-white/50 mz_dark-btn hover:bg-brand-primary-500 hover:text-white focus:text-white hover:border-gray-200 mz_trans focus:bg-brand-primary-500"
          aria-label="Thème du site"
          role="button"
          tabIndex={0}
        > */}
        <MoonIcon className="inline dark:hidden w-4 h-4" />
        <SunIcon className="hidden dark:inline w-4 h-4" />
        {/* </label> */}
      </Button>
      <AnimatePresence>
        {openDarkDiv && (
          <motion.div
            initial={{ scale: 0, opacity: 1, backgroundColor: '#000' }}
            animate={{ scale: 100, opacity: 0 }}
            exit={{ backgroundColor: '#fff', scale: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="w-[500px] h-[500px] bg-dark-bkg rounded-full shadow-xl fixed pointer-events-none z-50"
          />
        )}
      </AnimatePresence>
      {/* <label htmlFor="switchDark" className="min-w-fit hidden">
        <span className="inline dark:hidden">Dark Mode</span>
        <span className="hidden dark:inline">Light Mode</span>
      </label> */}
    </div>
  )
}
