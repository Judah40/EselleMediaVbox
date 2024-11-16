/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import SignInForm from "@/app/components/forms/SignInForm";
import Link from "next/link";

function page() {
  return (
    <div className="flex-1 flex items-center justify-center  w-full h-[100vh]">
      {/* background Image */}
      <div className="hidden lg:block w-6/12">
        <img
          src={"/backgrounds/signinbackgroundImage.png"}
          alt="sign-in-background-image"
          className="w-full h-[100vh]"
        />
      </div>
      {/* sign in form */}
      <div className="lg:w-6/12  ">
        <div className="w-full p-4 flex  justify-center">
          <Link href={"/pages/Home"}>
            <Image src={"/logo/vbox.png"} width={100} height={100} alt="logo" />
          </Link>
        </div>
        <div className="flex-1 h-full w-full items-center flex-col flex justify-center gap-4">
          <p className="text-4xl text-white">Welcome!</p>

          <SignInForm />
          {/* OAUTH */}
          <div className="w-full items-center flex flex-col gap-4">
            <p>Or sign in with</p>
            <button className="flex-row flex items-center p-3 rounded border w-8/12 justify-center">
              <FcGoogle size={24} />
              <p>Login with google</p>
            </button>
          </div>
          {/* Sign up section  */}
          <div>
            <p className="text-white text-center">
              Don&lsquo;t have an account?{" "}
              <Link
                href={"/pages/Auth/Signup"}
                className="underline text-cyan-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
