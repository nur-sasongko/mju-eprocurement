import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSonner } from "@/shared/hooks/use-sonner";
import {
  registerSchema,
  RegisterFormData,
  registerDefaultValues,
} from "../schemas/register";
import { AuthService } from "../services/auth";
import PATHS from "@/shared/utils/routes";

export function useRegister() {
  const { sonner } = useSonner();
  const { replace } = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      await AuthService.register(data);
    },
    onSuccess: () => {
      sonner.success("Registrasi berhasil! Silakan login.");
      form.reset();
      setTimeout(() => {
        replace(PATHS.PUBLIC.LOGIN);
      }, 2000);
    },
    onError: (error: Error) => {
      sonner.error(error.message || "Gagal registrasi.");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return {
    onSubmit,
    form,
    loading: isPending,
  };
}
