import z from "zod";

export const registerSchema = z
  .object({
    email: z.email("Format email tidak valid"),
    npwp: z
      .string()
      .regex(/^\d{15}$/, "NPWP harus terdiri dari 15 digit angka"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password harus mengandung 1 huruf kecil, 1 huruf besar, dan 1 angka"
      ),
    confirm_password: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirm_password"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const registerDefaultValues: RegisterFormData = {
  email: "",
  npwp: "",
  password: "",
  confirm_password: "",
};
