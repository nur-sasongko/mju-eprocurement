'use client';

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import Link from "next/link";
import { Mail, CheckCircle, RefreshCw, Clock, Send } from "lucide-react";
import { useForgotPassword } from "../hooks/use-forgot-password";
import PATHS from "@/shared/utils/routes";
import { FormInput } from "@/shared/components/forms/form-input";

export default function ForgotPasswordPage() {
  const {
    onSubmit,
    form,
    loading,
    isEmailSent,
    resendLoading,
    countdown,
    canResend,
    onResendEmail,
    formatCountdown,
    resetState
  } = useForgotPassword();

  const {
    handleSubmit,
    formState: { isDirty },
    control,
    watch,
  } = form;

  const emailValue = watch('email');

  if (isEmailSent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Email Terkirim!</CardTitle>
            <CardDescription>
              Kami telah mengirim link reset password ke{' '}
              <span className="font-medium text-gray-900">{emailValue}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Langkah selanjutnya:</p>
                    <ol className="list-decimal list-inside space-y-1 text-blue-700">
                      <li>Cek inbox email Anda</li>
                      <li>Klik link &quot;Reset Password&quot;</li>
                      <li>Buat password baru yang aman</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>Tidak menerima email?</p>
                <p className="mt-1">Cek folder spam atau kirim ulang email.</p>
              </div>

              {/* Resend Email Section */}
              <div className="space-y-3">
                {!canResend ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>
                      Kirim ulang tersedia dalam {formatCountdown(countdown)}
                    </span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    onClick={onResendEmail}
                    disabled={resendLoading}
                    className="w-full"
                  >
                    {resendLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Mengirim Ulang...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Kirim Ulang Email
                      </>
                    )}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  onClick={resetState}
                  className="w-full text-sm text-gray-600 hover:text-gray-800"
                >
                  Gunakan Email Lain
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-center">
            <Link
              href={PATHS.PUBLIC.LOGIN}
              className="mx-auto text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Kembali ke Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Lupa Password?</CardTitle>
          <CardDescription>
            Masukkan email Anda dan kami akan mengirim link untuk reset password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="email"
              type="email"
              control={control}
              label="Email"
              placeholder="Masukkan email Anda"
              required
            />

            <div className="space-y-4">
              <Button type="submit" className="w-full" disabled={loading || !isDirty}>
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Kirim Link Reset Password
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link
                  href={PATHS.PUBLIC.LOGIN}
                  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Kembali ke Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
