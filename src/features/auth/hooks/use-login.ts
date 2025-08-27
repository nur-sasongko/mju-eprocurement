import { useForm } from "react-hook-form";
import { defaultLoginValues, loginSchema, LoginSchemaType } from "../schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../services/auth";
import { useSonner } from "@/shared/hooks/use-sonner";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const { sonner } = useSonner();
  const { replace } = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });

  const { mutate: onLogin, isPending } = useMutation({
    mutationFn: (data: LoginSchemaType) => {
      return AuthService.login(data.email, data.password);
    },
    onSuccess: () => {
      sonner.success("Login berhasil!");

      // Redirect to dashboard
      replace("/dashboard");
    },
    onError: (error: unknown) => {
      sonner.error((error as Error).message || "Login gagal. Silakan coba lagi.");
    },
  });

  const onSubmit = (data: LoginSchemaType) => {
    onLogin(data);
  };

  return {
    onSubmit,
    form,
    loading: isPending,
  };
};

export { useLogin };
