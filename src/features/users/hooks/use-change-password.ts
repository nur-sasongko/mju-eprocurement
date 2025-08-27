import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { changePasswordDefaultValues, ChangePasswordFormData, changePasswordSchema } from "@/features/auth/schemas/change-password";
import { AuthService } from "@/features/auth/services/auth";
import { useSonner } from "@/shared/hooks/use-sonner";

export function useChangePassword() {
  const { sonner } = useSonner();

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: changePasswordDefaultValues,
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (data: ChangePasswordFormData) => {
      await AuthService.resetPassword(data.password);
    },
    onSuccess: () => {
      sonner.success(
        "Password berhasil diubah!"
      );
      passwordForm.reset();
    },
    onError: (error: Error) => {
      sonner.error(`Gagal mengubah password: ${error.message}`);
    },
  });

  const handleChangePassword = (data: ChangePasswordFormData) => {
    changePasswordMutation.mutate(data);
  };

  return {
    passwordForm,
    handleChangePassword,
    isChangingPassword: changePasswordMutation.isPending,
  };
}
