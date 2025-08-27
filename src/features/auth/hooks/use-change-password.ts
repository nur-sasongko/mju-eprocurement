import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSonner } from "@/shared/hooks/use-sonner";
import { changePasswordDefaultValues, ChangePasswordFormData, changePasswordSchema } from "../schemas/change-password";
import PATHS from "@/shared/utils/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "../services/auth";
import { QUERIES } from "@/shared/utils/queries";


export const useChangePassword = () => {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const { sonner } = useSonner();
  const { replace } = useRouter();

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: changePasswordDefaultValues,
  });

  // Verify the password reset token when the component mounts
  const { isError, isSuccess } = useQuery({
    queryKey: [QUERIES.AUTH.VERIFY_PASSWORD_RESET_TOKEN],
    queryFn: () => AuthService.verifyPasswordResetToken(),
  });

  // Mutation to change the password
  const { isPending, mutate } = useMutation({
    mutationFn: async (data: ChangePasswordFormData) => {
      await AuthService.resetPassword(data.password);
    },
    onSuccess: () => {
      sonner.success(
        "Password berhasil diubah! Anda akan dialihkan ke halaman login."
      );
      form.reset();
      setTimeout(() => {
        replace(PATHS.PUBLIC.LOGIN);
      }, 2000);
    },
    onError: (error: Error) => {
      sonner.error(`Gagal mengubah password: ${error.message}`);
    },
  });

  // Handle form submission
  const onSubmit = async (data: ChangePasswordFormData) => {
    mutate(data);
  };

  // Handle the result of the token verification
  useEffect(() => {
    if (isSuccess) {
      setIsValidToken(true);
    }
    if (isError) {
      setIsValidToken(false);
      sonner.error("Link reset password tidak valid atau sudah kedaluwarsa.");
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return {
    form,
    loading: isPending,
    isValidToken,
    onSubmit,
  };
};
