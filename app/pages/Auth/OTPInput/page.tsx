"use client";

import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleOTPVerification } from "@/app/api/AuthApi/api";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Cookies from "js-cookie";

interface OTPInputProps {
  onComplete?: (otp: string) => void;
  length?: number;
}

const OTPInput: React.FC<OTPInputProps> = ({ onComplete, length = 6 }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number): void => {
    const value = element.value;

    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError("");

    // Move to next input if available
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    const otpValue = newOtp.join("");
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);

    if (!/^\d+$/.test(pasteData)) {
      setError("Please paste numbers only");
      return;
    }

    const newOtp = [...otp];
    pasteData.split("").forEach((value, index) => {
      if (index < length) {
        newOtp[index] = value;
      }
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastFilledIndex = Math.min(pasteData.length, length) - 1;
    if (lastFilledIndex >= 0) {
      inputRefs.current[lastFilledIndex]?.focus();
    }

    // Check if OTP is complete
    const otpValue = newOtp.join("");
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const otpValue = otp.join("");
    if (otpValue.length !== length) {
      setError(`Please enter all ${length} digits`);

      return;
    }

    if (onComplete) {
      onComplete(otpValue);
    }
    await handleOTPVerification(otpValue)
      .then((response) => {
        Cookies.set("token", response.data.token);

        router.push("/pages/Auth/PasswordSetup");
      })
      .catch((error) => {
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    // Prevent non-numeric input
    if (!/^\d*$/.test(e.target.value)) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Enter Verification Code
          </CardTitle>
          <p className="text-center text-gray-400 mt-2">
            We&apos;ve sent a {length}-digit code to your device
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element: HTMLInputElement | null) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  onInput={handleInput}
                  aria-label={`Digit ${index + 1}`}
                  className="w-12 h-14 text-center text-xl font-bold rounded-lg 
                           bg-gray-700 border-2 border-gray-600 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                           focus:outline-none text-white
                           transition-all duration-200"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm" role="alert">
                {error}
              </p>
            )}

            <Button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg
                       transition-colors duration-200"
            >
              {isLoading ? <Spinner /> : <p>Verify Code</p>}
            </Button>

            <div className="text-center text-sm text-gray-400">
              Didn&apos;t receive the code?{" "}
              <button
                className="text-blue-400 hover:text-blue-300 focus:outline-none"
                onClick={() => {
                  // Handle resend logic here
                }}
              >
                Resend
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPInput;
