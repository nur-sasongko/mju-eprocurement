"use client";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CheckCircle, Loader2, LogOut, Home, Shield, Clock } from "lucide-react";
import {useLogout} from "../hooks/use-logout";
import { useRouter } from "next/navigation";
import PATHS from "@/shared/utils/routes";

export default function LogoutPage() {
  const { replace } = useRouter();

  const {
    logoutState,
    countdown,
    logoutTime,
    sessionTime,
    isClient,
    handleRetryLogout
  } = useLogout();


  const renderContent = () => {
    switch (logoutState) {
      case "pending":
        return (
          <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Sedang Keluar</CardTitle>
              <CardDescription className="text-gray-600">
                Mohon tunggu sementara kami mengeluarkan Anda dengan aman...
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full animate-pulse w-full transition-all duration-1000"></div>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Mengamankan sesi Anda dan menghapus data...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "success":
        return (
          <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-green-800">Berhasil Keluar</CardTitle>
              <CardDescription className="text-gray-600">
                Anda telah berhasil keluar dari akun Anda dengan aman.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Status Keamanan</span>
                </div>
                <p className="text-sm text-green-700">
                  Sesi Anda telah dihentikan dan semua data autentikasi telah dihapus dari perangkat ini.
                </p>
              </div>

              {logoutTime && (
                <div className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Keluar pada: <span className="font-medium">{logoutTime}</span></span>
                  </div>
                </div>
              )}

              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Otomatis mengarahkan dalam <span className="font-bold text-blue-600 text-lg">{countdown}</span> detik</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={() => replace(PATHS.HOME)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  size="lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Ke Beranda Sekarang
                </Button>
                <Button
                  onClick={() => replace(PATHS.PUBLIC.LOGIN)}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Masuk Lagi
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "error":
        return (
          <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                <LogOut className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-800">Masalah Logout</CardTitle>
              <CardDescription className="text-gray-600">
                Terjadi masalah saat menyelesaikan proses logout.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Rekomendasi Keamanan</span>
                </div>
                <p className="text-sm text-red-700">
                  Untuk keamanan Anda, silakan hapus cache dan cookies browser secara manual, atau tutup semua jendela browser.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  onClick={handleRetryLogout}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  size="lg"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Coba Logout Lagi
                </Button>
                <Button
                  onClick={() => replace(PATHS.HOME)}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Lanjut ke Beranda
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderContent()}

        {isClient && (
          <div className="mt-6 text-center text-xs text-gray-400 space-y-1">
            <p>Proses Logout Aman</p>
            <p>Sesi: {sessionTime}</p>
          </div>
        )}
      </div>
    </div>
  );
}
