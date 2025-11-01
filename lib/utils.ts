import { addToast } from '@heroui/toast'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Fusionne intelligemment les classes Tailwind
 * - clsx permet de gérer les conditions (true/false)
 * - twMerge permet d’éviter les doublons/conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mzToast(
  title = 'Admin',
  description: string,
  color?:
    | 'success'
    | 'default'
    | 'foreground'
    | 'warning'
    | 'primary'
    | 'secondary'
    | 'danger',
) {
  addToast({
    title: title,
    description,
    timeout: 3000,
    shouldShowTimeoutProgress: true,
    variant: 'solid',
    classNames: {
      base: cn([
        'bg-white dark:bg-dark-div dark:text-white',
        // "border border-l-8 rounded-md rounded-l-none",
        // "flex flex-col items-start",
        // "border-primary-200 dark:border-primary-100 border-l-primary",
      ]),
      title: 'dark:text-gray-300',
      description: 'dark:text-white',
      icon: 'fill-current',
    },
    color,
  })
}
