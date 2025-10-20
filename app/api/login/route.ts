import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export async function POST(req: Request) {
  //   const { user, password } = await req.json()

  const formData = await req.formData()
  const user = formData.get('user')
  const password = formData.get('password')

  if (
    user === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    const cookie = serialize('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 jour
    })

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          'Set-Cookie': cookie,
        },
      },
    )
    // response.headers.set('Set-Cookie', cookie)
    // return response
  }

  return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
}
