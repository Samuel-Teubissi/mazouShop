'use client'
import { useEffect, useState } from 'react'
import CreatableTailwindSelect from '@/components/CreatableTailwindSelect'

export default function ClientOnlySelect(props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return <CreatableTailwindSelect {...props} />
}
