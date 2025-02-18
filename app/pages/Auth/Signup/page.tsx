"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const SignupForm = dynamic(() => import("@/app/components/forms/SignupForm"), { ssr: false });
// eslint-disable-next-line react/display-name
const Logo = memo(() => (
  <div className="md:absolute md:top-8 md:left-8">
    <Link href="/pages/Home">
      <Image
        src="/logo/vbox.png"
        width={80}
        height={80}
        alt="logo"
        className="hover:opacity-90 transition-opacity"
        priority
      />
    </Link>
  </div>
));
// eslint-disable-next-line react/display-name
const BackgroundImage = memo(() => (
  <div className="hidden lg:block lg:w-6/12 relative">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 mix-blend-overlay" />
    <Image
      src="/backgrounds/signupbackgroundImage.png"
      alt="Welcome"
      fill
      style={{ objectFit: "cover", objectPosition: "center" }}
      priority
    />
  </div>
));

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-white">
      {/* Left Panel - Form */}
      <div className="lg:w-6/12 w-full px-8 py-12 flex flex-col items-center justify-center relative">
        {/* Logo */}
        <Logo />

        {/* Signup Form */}
        <div className="w-full max-w-xl space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
            <p className="text-gray-500">Join us to get started with your journey</p>
          </div>

          <SignupForm />

          {/* Sign-in Link */}
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
      <BackgroundImage />
    </div>
  );
};

export default SignupPage;
