import React, { memo } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/app/components/forms/SignInForm"), {
  ssr: false,
});

const Logo = memo(() => (
  <Link href="/pages/Home" className="w-full flex justify-center group">
    <div className="relative">
      <div className="absolute inset-0 bg-cyan-500/20 blur-2xl group-hover:bg-cyan-500/30 transition-all duration-500 rounded-full"></div>
      <Image
        src="/logo/vbox.png"
        width={80}
        height={80}
        alt="logo"
        priority
        className="relative z-10 hover:scale-110 transition-transform duration-300"
      />
    </div>
  </Link>
));

Logo.displayName = "Logo";

function Page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[600px] sm:h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Main Content Container - Centered with proper spacing */}
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Glass Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10 p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Logo */}
            <div className="pb-2">
              <Logo />
            </div>

            {/* Welcome Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse" />
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome Back!
                </h1>
                <Sparkles
                  className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                Sign in to continue your journey
              </p>
            </div>

            {/* Sign In Form */}
            <div className="space-y-4 pt-2">
              <SignInForm />
            </div>

            {/* Divider */}
            <div className="relative flex items-center py-3">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-3 sm:mx-4 text-gray-400 text-xs sm:text-sm font-medium">
                Or continue with
              </span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>

            {/* OAuth Section */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl transition-all duration-300 group hover:scale-[1.02] active:scale-95">
                <FcGoogle
                  size={20}
                  className="sm:w-6 sm:h-6 group-hover:scale-110 transition-transform flex-shrink-0"
                />
                <span className="text-white font-medium text-sm sm:text-base">
                  Continue with Google
                </span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1 flex-shrink-0" />
              </button>
            </div>

            {/* Sign-up Link */}
            <div className="pt-4 sm:pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-center text-xs sm:text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/pages/Auth/Signup"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 hover:underline-offset-4 transition-all inline-flex items-center gap-1 group"
                >
                  Sign Up
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-gray-500 text-[10px] sm:text-xs mt-6 sm:mt-8 px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Page;
