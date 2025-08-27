import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useCallback } from "react";
import {
  forgotPasswordDefaultValues,
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../schemas/forgot-password";
import { useSonner } from "@/shared/hooks/use-sonner";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth";

// 60 seconds cooldown
const RESEND_COOLDOWN = 60;

type ForgotPasswordMutation = {
  email: string;
  action: "forgot" | "resend";
};

const useForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const { sonner } = useSonner();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordDefaultValues,
  });

  const startCountdown = useCallback(() => {
    setCountdown(RESEND_COOLDOWN);
    setCanResend(false);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email }: ForgotPasswordMutation) => {
      return AuthService.forgotPassword(email);
    },
    onSuccess: (_, { action }: ForgotPasswordMutation) => {
      if (action === "forgot") {
        sonner.success(
          "Email reset password telah dikirim. Silakan cek inbox Anda."
        );

        setIsEmailSent(true);
        startCountdown();
      } else if (action === "resend") {
        sonner.success("Email reset password berhasil dikirim ulang.");
        startCountdown();

        setResendLoading(false);
      }
    },
    onError: (error: Error, variables) => {
      if (variables.action === "forgot") {
        sonner.error(
          error.message || "Gagal mengirim email reset password."
        );
      } else if (variables.action === "resend") {
        setResendLoading(false);

        sonner.error("Gagal mengirim ulang email reset password.");
      }
    },
  });

  // Submit handler
  const onSubmit = (data: ForgotPasswordFormData) => {
    mutate({ email: data.email, action: "forgot" });
  };

  // Resend handler
  const onResendEmail = () => {
    if (!canResend || resendLoading) return;

    setResendLoading(true);

    const email = form.getValues("email") || form.watch("email");
    if (!email) {
      sonner.error("Email tidak ditemukan. Silakan coba lagi.");
      return;
    }

    mutate({ email, action: "resend" });
  };

  const formatCountdown = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const resetState = useCallback(() => {
    setIsEmailSent(false);
    setCountdown(0);
    setCanResend(false);
    setResendLoading(false);
  }, []);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0 && isEmailSent) {
      setCanResend(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isEmailSent]);

  return {
    form,
    loading: isPending,
    isEmailSent,
    resendLoading,
    countdown,
    canResend,
    onSubmit,
    onResendEmail,
    formatCountdown,
    resetState,
  };
};

export { useForgotPassword };
