'use client';

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import Link from "next/link";
import { useLogin } from "../hooks/use-login";
import PATHS from "@/shared/utils/routes";
import { FormInput } from "@/shared/components/forms/form-input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import BrandingIcon from "@/shared/components/branding/branding-icon";

export default function LoginPage() {
  const { onSubmit, form, loading } = useLogin();
  const [ showPassword, setShowPassword ] = useState<boolean>(false);

  const {
    handleSubmit,
    formState: { isDirty },
    control,
  } = form;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center flex flex-col items-center">
          <BrandingIcon size={56} className="mx-auto mb-2" />
          <CardTitle className="text-2xl">Selamat Datang</CardTitle>
          <CardDescription>Masuk ke dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
                name="password"
                type={showPassword ? "text" : "password"}
                control={control}
                label="Password"
                placeholder="Masukkan password Anda"
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
              <Button type="submit" className="w-full" disabled={loading || !isDirty}>
                {loading ? "Loading..." : "Masuk"}
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <Link href={PATHS.PUBLIC.FORGOT_PASSWORD} className="mx-auto text-sm underline">
            Lupa password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
