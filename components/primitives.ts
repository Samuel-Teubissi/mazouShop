import { tv } from 'tailwind-variants'

export const title = tv({
  base: 'tracking-tight inline font-semibold',
  variants: {
    color: {
      red: 'from-[#E44E4E] to-[#BF2A1D]',
      violet: 'from-[#FF1CF7] to-[#b249f8]',
      yellow: 'from-[#FF705B] to-[#FFB457]',
      blue: 'from-[#5EA2EF] to-[#0072F5]',
      cyan: 'from-[#00b7fa] to-[#01cfea]',
      green: 'from-[#6FEE8D] to-[#17c964]',
      pink: 'from-[#FF72E1] to-[#F54C7A]',
      foreground: 'dark:from-[#FFFFFF] dark:to-[#4B4B4B]',
    },
    size: {
      sm: 'text-3xl lg:text-3xl',
      md: 'text-[2.3rem]/7 lg:text-4xl',
      lg: 'text-6xl',
    },
    fullWidth: {
      true: 'w-full block',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  compoundVariants: [
    {
      color: [
        'violet',
        'yellow',
        'blue',
        'cyan',
        'green',
        'pink',
        'foreground',
      ],
      class: 'bg-clip-text text-transparent bg-gradient-to-b',
    },
  ],
})

export const customCheckbox = tv({
  variants: {
    isSelected: {
      true: {
        base: 'border-brand-primary-500 bg-brand-primary-500 hover:bg-primary-500 hover:border-primary-500',
        // content: 'text-primary-foreground pl-1',
      },
    },
  },
})

export const subtitle = tv({
  base: 'w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full',
  variants: {
    fullWidth: {
      true: '!w-full',
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
})

export const mz_button = tv({
  base: 'transition-colors duration-200 cursor-pointer active:scale-95 opacity-100',
  variants: {
    bkg: {
      default: '',
      primary: '!bg-brand-primary-400 !text-white',
      secondary: '!bg-brand-primary-500 !text-white',
    },
    hoverText: {
      primary: 'hover:text-brand-primary-500',
      secondary: 'hover:text-white focus:text-white',
    },
    hoverBkg: {
      true: 'hover:bg-brand-primary-500 focus:bg-brand-primary-500',
      false: '',
    },
    border: {
      true: 'border border-transparent hover:border-gray-200',
      false: '',
    },
    radius: {
      small: 'rounded-md',
      big: 'rounded-2xl',
    },
    defaultVariants: {
      bkg: 'default',
      hoverText: 'primary',
      hoverBkg: false,
      border: false,
      radius: 'small',
    },
  },
})
