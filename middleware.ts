import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const {pathname} = request.nextUrl.clone()
    const apiurl = process.env.NEXT_PUBLIC_API_URL
    const token =  request.cookies.get('token')
    const userType =  request.cookies.get('userType')
  const apiResponse = await fetch(`${apiurl}/auth/authenticate`, {
    method: 'post', // You can change to 'POST', 'PUT', etc.
    headers: {
      'Authorization': `Bearer ${token?.value}`, // Attach Bearer token
      'Content-Type': 'application/json', // Specify content type
    },
  });
  console.log(userType)

  const pages = pathname.split('/')[2]
  const path = pathname.split('/')
  console.log(path.length)
  if(!apiResponse.ok && pages==="Auth"){
    return NextResponse.next()
  }
  if (apiResponse.ok && pages ==="Dashboard" && userType?.value==="Admin") {
    return NextResponse.next()
  }
  if(apiResponse.ok && pages==="Live" && path.length===4){
    return NextResponse.next()
  }
  if(apiResponse.ok && pages==="Settings"){
    return NextResponse.next()

  }
  // if(apiResponse.ok && pages==="Extras" && path.length===4){
  //   return NextResponse.next()
  // }

  if(!apiResponse.ok && pages==="Live" && path.length===3){
    return NextResponse.next()
  }
  if(!apiResponse.ok && pages==="Live" && path.length===4){
    console.log("hi")
    return NextResponse.redirect(new URL('/pages/Auth/Signin', request.url))
  }
  return NextResponse.redirect(new URL('/pages/Home', request.url))
} catch (error) {
    
  }
// return NextResponse.json({
//     message: 'Hello from middleware!',
// })
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/pages/Dashboard/:path*',
    //  '/pages/Auth/:path*',
     '/pages/Live/:path*', 
     '/pages/Settings/:path*' 
    //  '/pages/Extras/:path*' 
    ],
}