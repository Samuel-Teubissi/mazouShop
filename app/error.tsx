'use client'

import { Button } from '@heroui/button'
import { OctagonAlert } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error)
  }, [error])

  return (
    <div className="mz_container-body px-3 mb-8">
      <div className="min-h-75 w-full flex flex-col justify-center items-center bg-gray-200/40 dark:bg-dark-div gap-2">
        <OctagonAlert strokeWidth={1.5} width={100} height={100} />
        <h2>Une erreur s'est produite</h2>

        <Button
          color="default"
          variant="flat"
          onPress={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Recharger la page
        </Button>
      </div>
    </div>
  )
}
