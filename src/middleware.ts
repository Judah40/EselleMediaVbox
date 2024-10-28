import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/page/Home', request.url))
// return NextResponse.json({
//     message: 'Hello from middleware!',
// })
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/page/Dashboard', '/page/Auth'],
}