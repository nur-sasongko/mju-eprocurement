'use client';

import { Button } from "@/shared/components/ui/button";
import { useLogin } from "../hooks/use-login";
import { FormInput } from "@/shared/components/forms/form-input";
import { useState } from "react";
import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "lucide-react";

export default function LoginPage() {
  const { onSubmit, form, loading } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { isDirty },
    control,
  } = form;

  return (
    <div className="w-full max-w-md space-y-10">
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-4xl font-medium text-gray-900">
          Masuk ke
        </h1>
        <h2 className="text-4xl font-medium text-gray-900">
          E-Procurement
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="email"
          type="email"
          control={control}
          label="Email"
          placeholder="Masukkan email"
          required
        />

        <FormInput
          name="password"
          type={showPassword ? "text" : "password"}
          control={control}
          label="Password"
          placeholder="Masukan kata sandi"
          required
          iconRight={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          }
        />

        <div className="flex justify-between items-center gap-3 mt-10">
          <Button
            type="button"
            variant="link"
            className="text-[#69BA44] hover:text-[#69BA44]/80 text-sm font-medium"
          >
            Lupa Kata Sandi?
          </Button>

          <Button
            type="submit"
            disabled={loading || !isDirty}
            className="w-fit text-white font-medium py-4 px-6 rounded-md flex items-center justify-center gap-2"
          >
            Masuk
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center">
          <Button
            type="button"
            variant="link"
            className="bg-gradient-to-r from-[#46B5FF] to-[#0886D9] text-transparent bg-clip-text text-sm font-medium flex items-center gap-1 mx-auto decoration-[#46B5FF]"
          >
            <span className="">
              Daftarkan Vendor
            </span>
            <ArrowRightIcon className="h-3 w-3 text-[#0886D9]" />
          </Button>
        </div>
      </form>
    </div>
  );
}
