import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone, DropzoneState, FileRejection } from 'react-dropzone'
// import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { ArrowUpIcon, FileImage, UploadIcon, XIcon } from 'lucide-react'

type MyDropzoneProps = {
  className?: string
  onFilesChange: (files: File[]) => void
}
type FileWithPreview = File & {
  preview: string
}
// type FileRejection = {
//   file: File
//   errors: { code: string; message: string }[]
// }

const Dropzone = ({ onFilesChange, className }: MyDropzoneProps) => {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [rejected, setRejected] = useState<FileRejection[]>([])

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ])
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles])
      }
    },
    [],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxSize: 1024 * 1000 * 2,
    onDrop,
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name))
  }

  // ✅ Notifie le parent seulement quand `files` change
  useEffect(() => {
    if (onFilesChange) onFilesChange(files)
  }, [files, onFilesChange])

  //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault()

  //     if (!files?.length) return

  //     const formData = new FormData()
  //     files.forEach((file) => formData.append('file', file))
  //     formData.append('upload_preset', 'friendsbook')

  //     // const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL
  //     // const data = await fetch(URL, {
  //     //   method: 'POST',
  //     //   body: formData,
  //     // }).then((res) => res.json())

  //     // console.log(data)
  //   }

  return (
    // <form onSubmit={handleSubmit}>
    <div>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-500 rounded-large px-4 py-6 cursor-pointer bg-default-100 hover:bg-default-200 transition-background motion-reduce:transition-none !duration-150">
          <UploadIcon className="w-5 h-5 fill-current" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      {(files.length >= 1 || rejected.length >= 1) && (
        <section className="mt-4 flex flex-col gap-8">
          <div className="flex gap-4">
            <h2 className="title text-3xl font-semibold">Preview</h2>
            <button
              type="button"
              onClick={removeAll}
              className="text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
            >
              Remove all files
            </button>
            {/* <button
            type="submit"
            className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors"
          >
            Upload to Cloudinary
          </button> */}
          </div>

          {/* Accepted files */}
          {files.length >= 1 && (
            <div className="flex flex-col gap-6">
              <h3 className="title text-lg font-semibold text-neutral-600 dark:text-gray-200 mt-2 border-b pb-3">
                Accepted Files
              </h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
                {files.map((file) => (
                  <li
                    key={file.name}
                    className="relative w-32 h-fit rounded-md"
                  >
                    <Image
                      src={file.preview}
                      alt={file.name}
                      width={100}
                      height={100}
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                      }}
                      className="h-full w-full object-contain rounded-md"
                    />
                    <button
                      type="button"
                      className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-secondary-600 hover:text-white transition-colors"
                      onClick={() => removeFile(file.name)}
                    >
                      <XIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                    </button>
                    <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                      {file.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rejected Files */}
          {rejected.length >= 1 && (
            <div className="flex flex-col gap-4">
              <h3 className="title text-lg font-semibold text-neutral-600 dark:text-gray-300 mt-2 border-b pb-3">
                Rejected Files
              </h3>
              <ul className="flex flex-col gap-2">
                {rejected.map(({ file, errors }) => (
                  <li
                    key={file.name}
                    className="flex items-start justify-between"
                  >
                    <div>
                      <p className="text-neutral-500 text-sm font-medium">
                        {file.name}
                      </p>
                      <ul className="text-[12px] text-red-400">
                        {errors.map((error) => (
                          <li key={error.code}>{error.message}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                      onClick={() => removeRejected(file.name)}
                    >
                      remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default Dropzone
