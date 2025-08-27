import { supabase } from "@/lib/supabase/client";
import { AuthReturn } from "../types";
import PATHS from "@/shared/utils/routes";

export class AuthService {
  static async login(email: string, password: string): Promise<AuthReturn> {
    const { error, data: userData } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      if (error.code === "invalid_credentials") {
        throw new Error("Email atau password salah.");
      }
      if (error.code === "user_not_found") {
        throw new Error(
          "Pengguna tidak ditemukan. Silakan daftar terlebih dahulu."
        );
      }
      if (error.code === "too_many_requests") {
        throw new Error("Terlalu banyak permintaan. Silakan coba lagi nanti.");
      }
      throw new Error("Email atau password salah.");
    }

    return userData;
  }

  static async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error("Gagal logout.");
    }
  }

  static async forgotPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + PATHS.PUBLIC.CHANGE_PASSWORD,
    });

    if (error) {
      throw new Error(`Gagal mengirim email reset password: ${error.message}`);
    }
  }

  static async verifyPasswordResetToken(): Promise<boolean> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      throw new Error(
        "Token reset password tidak valid atau sudah kedaluwarsa."
      );
    }

    return true;
  }

  static async resetPassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      if (error.code === "over_email_send_rate_limit") {
        throw new Error("Terlalu banyak permintaan. Silakan coba lagi nanti.");
      }

      throw new Error(`Gagal mengatur ulang password: ${error.message}`);
    }
  }
}
