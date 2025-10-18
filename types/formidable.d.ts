declare module 'formidable' {
  import { IncomingMessage } from 'http'

  export class IncomingForm {
    constructor(options?: any)
    parse(
      req: IncomingMessage,
      callback: (
        err: any,
        fields: Record<string, any>,
        files: Record<string, any>,
      ) => void,
    ): void
    [key: string]: any
  }

  export interface File {
    filepath: string
    newFilename: string
    originalFilename: string
    mimetype: string
    size: number
    [key: string]: any
  }

  const formidable: {
    IncomingForm: typeof IncomingForm
  }

  export default formidable
}
