import z from "zod";

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password harus mengandung minimal 1 huruf kecil, 1 huruf besar, dan 1 angka"
      ),
    confirm_password: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirm_password"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const changePasswordDefaultValues: ChangePasswordFormData = {
  password: "",
  confirm_password: "",
};
