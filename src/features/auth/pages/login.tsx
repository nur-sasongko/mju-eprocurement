'use client';

import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { useLogin } from "../hooks/use-login";
import PATHS from "@/shared/utils/routes";
import { FormInput } from "@/shared/components/forms/form-input";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
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
    <div className="min-h-screen flex">
      {/* Left Side - Company Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-800/90"></div>
        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
          <div className="mb-8">
            <BrandingIcon size={80} className="mb-6" />
            <h1 className="text-4xl font-bold mb-4">Unit Pengelola Zakat KPAD</h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Platform e-Procurement yang memudahkan pengelolaan pengadaan barang dan jasa secara digital, 
              transparan, dan efisien untuk Unit Pengelola Zakat KPAD.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Kontak Kami</h2>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-200" />
              <span className="text-blue-100">+62 21 1234 5678</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-200" />
              <span className="text-blue-100">info@upzkpad.go.id</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-blue-200" />
              <span className="text-blue-100">Jakarta, Indonesia</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full translate-y-48 -translate-x-48"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <BrandingIcon size={60} className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unit Pengelola Zakat KPAD</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Masuk ke Sistem</h2>
            <p className="text-gray-600">Silakan masukkan email dan password Anda</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              name="email"
              type="email"
              control={control}
              label="Email"
              placeholder="Masukkan email Anda"
              required
              containerClassName="space-y-2"
              inputClassName="h-12 text-base"
            />

            <FormInput
              name="password"
              type={showPassword ? "text" : "password"}
              control={control}
              label="Password"
              placeholder="Masukkan password Anda"
              required
              containerClassName="space-y-2"
              inputClassName="h-12 text-base"
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              }
            />

            <div className="text-right">
              <Link 
                href={PATHS.PUBLIC.FORGOT_PASSWORD} 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                Lupa Kata Sandi?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 transition-colors" 
              disabled={loading || !isDirty}
            >
              {loading ? (
                "Memproses..."
              ) : (
                <>
                  Masuk
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Belum memiliki akun?{" "}
              <Link 
                href="#" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Daftarkan Vendor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
