"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const InputOTP = dynamic(() =>
  import("@/components/ui/input-otp").then((mod) => mod.InputOTP)
);
const InputOTPGroup = dynamic(() =>
  import("@/components/ui/input-otp").then((mod) => mod.InputOTPGroup)
);
const InputOTPSlot = dynamic(() =>
  import("@/components/ui/input-otp").then((mod) => mod.InputOTPSlot)
);

import { handleOTPVerification } from "@/app/api/AuthApi/api";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [getPhoneNumber, setGetPhoneNumber] = useState<string>("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data)
    setIsLoading(true);
    handleOTPVerification(data.pin)
      .then((response) => {
        // router.push("/pages/Auth/PasswordSetup");
        Cookies.set("token", response.data.token);
        Cookies.set("userType", response.data.userType);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }
  // eslint-disable-next-line react/display-name
  const PhoneNumber = memo(
    ({
      setGetPhoneNumber,
    }: {
      setGetPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
    }) => {
      useEffect(() => {
        const phoneNumber = localStorage.getItem("phoneNumber");
        if (phoneNumber) {
          setGetPhoneNumber(phoneNumber);
        }
      }, [setGetPhoneNumber]);
      return null; // This component only sets the state; no UI is needed
    }
  );

  return (
    <>
      <PhoneNumber setGetPhoneNumber={setGetPhoneNumber} />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-1 items-center justify-center flex-col h-[80vh] space-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem className=" flex flex-col items-center">
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the otp sent to{" "}
                  <span className="text-white">{getPhoneNumber}</span>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
