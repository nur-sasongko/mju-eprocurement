'use client';

import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon, EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useRegister } from "../hooks/use-register";
import { FormInput } from "@/shared/components/forms/form-input";
import PATHS from "@/shared/utils/routes";
import { useState } from "react";

export default function RegisterPage() {
  const { onSubmit, form, loading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          Daftar Sebagai
          Vendor
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="email"
          type="email"
          control={control}
          label="Email"
          placeholder="Masukkan email Anda"
          required
        />
        <FormInput
          name="npwp"
          type="text"
          control={control}
          label="NPWP"
          placeholder="Masukan nomor NPWP (15 digit)"
          required
        />
        <FormInput
          name="password"
          type={showPassword ? "text" : "password"}
          control={control}
          label="Kata Sandi"
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
        <FormInput
          name="confirm_password"
          type={showConfirmPassword ? "text" : "password"}
          control={control}
          label="Konfirmasi Kata Sandi"
          placeholder="Ulangi kata sandi"
          required
          iconRight={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          }
        />

        <div className="flex justify-end items-center gap-3 mt-10">
          <Button
            type="submit"
            disabled={loading || !isDirty}
            className="w-fit text-white font-medium py-4 px-6 rounded-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mendaftar...
              </>
            ) : (
              "Daftar"
            )}
          </Button>
        </div>

        <div className="text-center">
          <Link
            href={PATHS.PUBLIC.LOGIN}
          >
            <Button
              type="button"
              variant="link"
              className="bg-gradient-to-r from-[#46B5FF] to-[#0886D9] text-transparent bg-clip-text text-sm font-medium flex items-center gap-1 mx-auto decoration-[#46B5FF]"
            >
              <span className="">
                Masuk ke E-Procurement
              </span>
              <ArrowRightIcon className="h-3 w-3 text-[#0886D9]" />
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
