"use client"

// SignupPage.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SignupForm from "@/app/components/forms/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-white">
      {/* Left Panel - Form */}
      <div className="lg:w-6/12 w-full px-8 py-12 flex flex-col items-center justify-center relative">
        <div className="absolute top-8 left-8">
          <Link href="/pages/Home">
            <Image src="/logo/vbox.png" width={80} height={80} alt="logo" className="hover:opacity-90 transition-opacity" />
          </Link>
        </div>

        <div className="w-full max-w-xl space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
            <p className="text-gray-500">Join us to get started with your journey</p>
          </div>

          <SignupForm />

          <div className="text-center pt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/pages/Auth/Signin" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-6/12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 mix-blend-overlay" />
        <Image
          src="/backgrounds/signupbackgroundImage.png"
          alt="Welcome"
          layout="fill"
          objectFit="cover"
          className="object-center"
          priority
        />
      </div>
    </div>
  );
};

export default SignupPage;