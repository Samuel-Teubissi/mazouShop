import { NextRequest, NextResponse } from 'next/server'
// import formidable, { File } from "formidable";
// import { IncomingForm } from 'formidable'
import Busboy from 'busboy'
import { Readable } from 'stream'

export const config = {
  api: {
    bodyParser: false, // essentiel
  },
}

// type FormidableFile = File
// interface ParsedForm {
//   fields: { [key: string]: string | string[] }
//   files: FormidableFile[]
// }

export async function GET() {
  return NextResponse.json({
    ok: true,
  })
}

export async function POST(req: Request) {
  const headers = Object.fromEntries(req.headers)
  const busboy = Busboy({ headers })

  const files: any[] = []
  const fields: Record<string, string> = {}

  const stream = Readable.fromWeb(req.body as any)

  await new Promise<void>((resolve, reject) => {
    busboy.on('file', (fieldname, file, info) => {
      const { filename, mimeType, encoding } = info

      let fileSize = 0
      file.on('data', (data) => {
        fileSize += data.length
      })

      file.on('end', () => {
        files.push({
          fieldname,
          filename,
          mimeType,
          encoding,
          size: fileSize,
        })
      })
      console.log('Field:', fieldname, 'Filename:', info.filename)
    })

    busboy.on('field', (name, value) => {
      fields[name] = value
      console.log('Champ texte:', name, value)
    })

    busboy.on('finish', resolve)
    busboy.on('error', reject)

    stream.pipe(busboy)
  })

  return NextResponse.json({
    success: true,
    message: 'Fichiers reçus (non enregistrés)',
    fields,
    files,
  })
}

// export async function POST(req: Request) {
//   // const formData = await request.formData()
//   // const data = {
//   //   title: formData.get('title'),
//   //   newPrice: formData.get('price'),
//   //   oldPrice: formData.get('discount'),
//   //   description: formData.get('description'),
//   //   note: formData.get('note'),
//   //   review: formData.get('review'),
//   //   tags: formData.get('tags'),
//   //   profits: formData.get('profits'),
//   //   caracteristics: formData.get('caracteristics'),
//   //   imagesFiles: formData.get('files'),
//   // }

//   return NextResponse.json({ json: data })
// }
