/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { memo } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import dynamic from "next/dynamic";
const SignInForm = dynamic(() => import("@/app/components/forms/SignInForm"), {
  ssr: false,
});

const Logo = memo(() => (
  <Link href="/pages/Home" className="w-full p-4 flex justify-center">
    <Image src="/logo/vbox.png" width={100} height={100} alt="logo" priority />
  </Link>
));

function Page() {
  return (
    <div className="flex-1 flex items-center justify-center w-full  bg-gray-900">
      {/* Background Image */}
      {/* <BackgroundImage /> */}

      {/* Sign-in Form */}
      <div className="lg:w-6/12 flex flex-col items-center p-4 space-y-6">
        {/* Logo */}
        <Logo />

        <h1 className="text-4xl text-white">Welcome!</h1>

        <SignInForm />

        {/* OAuth Section */}
        <div className="w-full flex flex-col items-center gap-4">
          <p className="text-gray-300">Or sign in with</p>
          <button className="flex items-center px-4 py-2 border rounded w-8/12 justify-center gap-2 hover:bg-gray-800">
            <FcGoogle size={24} />
            <span>Login with Google</span>
          </button>
        </div>

        {/* Sign-up Link */}
        <p className="text-white text-center">
          Don&apos;t have an account?{" "}
          <Link href="/pages/Auth/Signup" className="underline text-cyan-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
