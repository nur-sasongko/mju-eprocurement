'use client';

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import Link from "next/link";
import { Lock, Loader2, Shield, AlertTriangle, EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useChangePassword } from "../hooks/use-change-password";
import PATHS from "@/shared/utils/routes";
import { FormInput } from "@/shared/components/forms/form-input";

export default function ChangePasswordPage() {
  const { onSubmit, form, loading, isValidToken } = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    formState: { isDirty },
    control,
    watch,
  } = form;

  const password = watch('password');

  // Show loading while verifying token
  if (isValidToken === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Memverifikasi link reset password...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error if token is invalid
  if (isValidToken === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-red-600">Link Tidak Valid</CardTitle>
            <CardDescription>
              Link reset password tidak valid atau sudah kedaluwarsa.
              Silakan minta link reset password baru.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href={PATHS.PUBLIC.FORGOT_PASSWORD}>
              <Button className="w-full">
                Minta Link Reset Password Baru
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Buat Password Baru</CardTitle>
          <CardDescription>
            Masukkan password baru yang aman untuk akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormInput
                name="password"
                control={control}
                type={showPassword ? "text" : "password"}
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

              {/* Password strength indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Shield className="w-3 h-3" />
                    <span>Kekuatan Password:</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                      Minimal 8 karakter
                    </div>
                    <div className={`flex items-center gap-2 ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                      Huruf kecil (a-z)
                    </div>
                    <div className={`flex items-center gap-2 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                      Huruf besar (A-Z)
                    </div>
                    <div className={`flex items-center gap-2 ${/\d/.test(password) ? 'text-green-600' : 'text-gray-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${/\d/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                      Angka (0-9)
                    </div>
                  </div>
                </div>
              )}
            </div>

            <FormInput
              name="confirm_password"
              control={control}
              type={showConfirmPassword ? "text" : "password"}
              label="Konfirmasi Password"
              placeholder="Masukkan ulang password baru"
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


            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  Pastikan password Anda aman dan mudah diingat. Setelah berhasil mengubah password,
                  Anda akan dialihkan ke halaman login.
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !isDirty}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengubah Password...
                </>
              ) : (
                "Ubah Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
